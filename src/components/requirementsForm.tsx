import { useState } from 'react';
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { HelpTooltip } from '../fragments/HelpTooltip';
import { handleDragEnd, SortableTextareaItem } from '../fragments/sortableTextAreaItem';
import { useRequirementContext } from '../context/requirementsContext';
import { useDocumentTools } from '../hooks/generateDocument';

export const RequirementsForm = () => {
    const { state, dispatch } = useRequirementContext();
    const { actuacionPrevia, solicitante, peticiones, hechos } = state;
    const { generateDocument } = useDocumentTools();
    const [currentStep, setCurrentStep] = useState(0);
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
        useSensor(MouseSensor),
    );

    const steps = [
        { key: 'actuacion', title: 'Actuacion previa', helper: 'Aqui puede indicar cual es la actuacion o documento que motiva la solicitud', required: false },
        {
            key: 'solicitante',
            title: 'Informacion del solicitante',
            helper: 'En las siguientes direcciones se notificara, comunicara o enviara la respuesta, se recomienda escribir bien las direcciones y asegurarse que sea una direccion reciente o que se revise frecuentemente.',
            required: true,
        },
        {
            key: 'peticiones',
            title: 'Peticiones',
            helper: 'Escribir las peticiones o preguntas de la manera mas clara posible, utilizando al inicio frases como se me informe, se me indique, o se me senale.',
            required: true,
        },
        {
            key: 'hechos',
            title: 'Hechos',
            helper: 'Escribir los hechos en orden cronologico, del mas antiguo al mas reciente, y de manera clara para que cada uno sea entendible.',
            required: true,
        },
        {
            key: 'resumen',
            title: 'Resumen',
            helper: 'Revise la informacion registrada antes de generar el documento final.',
            required: true,
        },
    ] as const;

    const isLastStep = currentStep === steps.length - 1;

    const hasFilledItems = (items: Array<{ value: string }>) => items.some((item) => item.value.trim().length > 0);
    const isActuacionComplete = actuacionPrevia.trim().length > 0;
    const isSolicitanteComplete = [
        solicitante.tratamiento,
        solicitante.nombre,
        solicitante.cedula,
        solicitante.direccion,
        solicitante.celular,
        solicitante.correo,
    ].every((field) => String(field).trim().length > 0);
    const isPeticionesComplete = hasFilledItems(peticiones);
    const isHechosComplete = hasFilledItems(hechos);

    const sectionCompletion = [
        true,
        isSolicitanteComplete,
        isPeticionesComplete,
        isHechosComplete,
        isSolicitanteComplete && isPeticionesComplete && isHechosComplete,
    ];

    const handleDragEndPeticiones = (event: DragEndEvent) => {
        handleDragEnd(event, () => {
            dispatch({
                type: 'REORDER_PETICIONES',
                payload: { activeId: String(event.active.id), overId: String(event.over?.id) },
            });
        })
    }

    const handleDragEndHechos = (event: DragEndEvent) => {
        handleDragEnd(event, () => {
            dispatch({
                type: 'REORDER_HECHOS',
                payload: { activeId: String(event.active.id), overId: String(event.over?.id) },
            });
        })
    }

    const goToStep = (index: number) => setCurrentStep(index);
    const goToNextStep = () => setCurrentStep((step) => Math.min(step + 1, steps.length - 1));

    return (
        <section className="surface-organic mx-auto w-full max-w-4xl p-4 backdrop-blur md:p-8">
            <header className="divider-soft mb-6 flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src={`${import.meta.env.BASE_URL}logo_img.png`}
                        alt="Logo"
                        className="h-16 w-16 rounded-2xl border border-base-200/60 bg-base-100 object-contain p-2 shadow-sm"
                    />
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Veeduria ciudadana por el pueblo de Mosquera</p>
                        <h1 className="text-2xl font-black leading-tight text-base-content sm:text-3xl">Solicitud de revision</h1>
                    </div>
                </div>
            </header>

            <section
                className="surface-panel overflow-hidden"
                data-stepper={`{"currentIndex": ${currentStep + 1}, "mode": "non-linear"}`}
            >
                <div className="bg-base-100/80 p-3 md:p-4">
                    <ol className="space-y-3">
                        {steps.map((step, index) => {
                            const isCompleted = sectionCompletion[index];
                            const isNotApplicable = step.key === 'actuacion' && !isActuacionComplete;
                            const status = isNotApplicable ? 'na' : isCompleted ? 'ok' : 'pending';
                            const isActive = currentStep === index;
                            const canJumpToStep = index === 0 || sectionCompletion[index - 1] || index <= currentStep;

                            return (
                                <li key={step.key}>
                                    <div className="flex items-start gap-2">
                                        <button
                                            type="button"
                                            onClick={() => canJumpToStep && goToStep(index)}
                                            disabled={!canJumpToStep}
                                            data-stepper-nav-item={`{"index": ${index + 1}}`}
                                            aria-current={isActive ? 'step' : undefined}
                                            className={`flex w-full items-start gap-3 rounded-2xl px-3 py-2 text-left transition-all ${!canJumpToStep
                                                ? 'cursor-not-allowed opacity-45'
                                                : isActive
                                                    ? 'bg-primary/12 ring-1 ring-primary/25 shadow-sm'
                                                    : status === 'ok'
                                                        ? 'bg-success/10 ring-1 ring-success/20'
                                                        : status === 'na'
                                                            ? 'bg-warning/15 ring-1 ring-warning/25'
                                                            : 'bg-base-100/70 ring-1 ring-base-300/60 hover:bg-base-100'} `}
                                        >
                                            <span
                                                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isActive
                                                    ? 'bg-primary text-primary-content'
                                                    : status === 'ok'
                                                        ? 'bg-success text-success-content'
                                                        : status === 'na'
                                                            ? 'bg-warning text-warning-content'
                                                            : 'bg-base-200 text-base-content/75'
                                                    }`}
                                            >
                                                {isActive ? index + 1 : status === 'ok' ? 'OK' : status === 'na' ? 'NA' : index + 1}
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-[11px] uppercase tracking-[0.15em] text-base-content/55">Paso {index + 1}</span>
                                                <span className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-base-content whitespace-normal break-words">
                                                    <span className="whitespace-normal break-words">{step.title}</span>
                                                    <span className="shrink-0">
                                                        <HelpTooltip text={step.helper} />
                                                    </span>
                                                </span>
                                            </span>
                                        </button>
                                    </div>

                                    {isActive && (
                                        <div
                                            className="mt-3 rounded-2xl border border-base-200/70 bg-base-100 p-4 md:p-5"
                                            data-stepper-content-item={`{"index": ${index + 1}}`}
                                        >
                                            <div className="divider-soft mb-4 border-b pb-4" />

                                            {currentStep === 0 && (
                                                <div className="space-y-2">
                                                    <label htmlFor="actuacionPrevia" className="label">
                                                        <span className="label-text font-semibold">Actuacion previa</span>
                                                    </label>
                                                    <input
                                                        id="actuacionPrevia"
                                                        type="text"
                                                        className="input input-bordered control-organic w-full"
                                                        placeholder="Ej: Impuesto predial XXXX para el ano 2026"
                                                        value={actuacionPrevia}
                                                        onChange={(event) => dispatch({ type: 'SET_ACTUACION_PREVIA', payload: event.target.value })}
                                                    />
                                                </div>
                                            )}

                                            {currentStep === 1 && (
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="md:col-span-1">
                                                        <label htmlFor="tratamiento" className="label">
                                                            <span className="label-text font-semibold">Tratamiento</span>
                                                        </label>
                                                        <select
                                                            id="tratamiento"
                                                            className="select select-bordered control-organic w-full"
                                                            value={solicitante.tratamiento}
                                                            onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'tratamiento', value: event.target.value } })}
                                                        >
                                                            <option value="">- Seleccione una opcion -</option>
                                                            <option value="Sr">Señor</option>
                                                            <option value="Sra">Señora</option>
                                                        </select>
                                                    </div>
                                                    <div className="md:col-span-1">
                                                        <label htmlFor="nombre" className="label">
                                                            <span className="label-text font-semibold">Nombre completo</span>
                                                        </label>
                                                        <input
                                                            id="nombre"
                                                            type="text"
                                                            className="input input-bordered control-organic w-full"
                                                            placeholder="Ej: Juan Perez"
                                                            value={solicitante.nombre}
                                                            onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'nombre', value: event.target.value } })}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-1">
                                                        <label htmlFor="cedula" className="label">
                                                            <span className="label-text font-semibold">Numero de cedula</span>
                                                        </label>
                                                        <input
                                                            id="cedula"
                                                            type="number"
                                                            className="input input-bordered control-organic w-full"
                                                            placeholder="Ej: 12345678"
                                                            value={solicitante.cedula}
                                                            onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'cedula', value: event.target.value } })}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-1">
                                                        <label htmlFor="celular" className="label">
                                                            <span className="label-text font-semibold">Celular</span>
                                                        </label>
                                                        <input
                                                            id="celular"
                                                            type="number"
                                                            className="input input-bordered control-organic w-full"
                                                            placeholder="Ej: 300 234 4955"
                                                            value={solicitante.celular}
                                                            onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'celular', value: event.target.value } })}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label htmlFor="direccion" className="label">
                                                            <span className="label-text font-semibold">Direccion</span>
                                                        </label>
                                                        <input
                                                            id="direccion"
                                                            type="text"
                                                            className="input input-bordered control-organic w-full"
                                                            placeholder="Ej: Calle X con Carrera Y"
                                                            value={solicitante.direccion}
                                                            onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'direccion', value: event.target.value } })}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label htmlFor="correo" className="label">
                                                            <span className="label-text font-semibold">Correo electronico</span>
                                                        </label>
                                                        <input
                                                            id="correo"
                                                            type="email"
                                                            className="input input-bordered control-organic w-full"
                                                            placeholder="Ej: correo@dominio.com"
                                                            value={solicitante.correo}
                                                            onChange={(event) => dispatch({ type: 'SET_SOLICITANTE_FIELD', payload: { field: 'correo', value: event.target.value } })}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {currentStep === 2 && (
                                                <div className="space-y-3">
                                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndPeticiones}>
                                                        <SortableContext items={peticiones.map((peticion: { id: string }) => peticion.id)} strategy={verticalListSortingStrategy}>
                                                            {peticiones.map((peticion: { id: string; value: string }) => (
                                                                <SortableTextareaItem
                                                                    key={peticion.id}
                                                                    id={peticion.id}
                                                                    value={peticion.value}
                                                                    placeholder="Descripcion de la peticion"
                                                                    onChange={(id: string, value: string) => dispatch({ type: 'UPDATE_PETICION', payload: { id, value } })}
                                                                    onRemove={(id: string) => dispatch({ type: 'REMOVE_PETICION', payload: id })}
                                                                />
                                                            ))}
                                                        </SortableContext>
                                                    </DndContext>
                                                    <button className="btn btn-outline btn-primary" type="button" onClick={() => dispatch({ type: 'ADD_PETICION' })}>
                                                        Agregar peticion
                                                    </button>
                                                </div>
                                            )}

                                            {currentStep === 3 && (
                                                <div className="space-y-3">
                                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndHechos}>
                                                        <SortableContext items={hechos.map((hecho: { id: string }) => hecho.id)} strategy={verticalListSortingStrategy}>
                                                            {hechos.map((hecho: { id: string; value: string }) => (
                                                                <SortableTextareaItem
                                                                    key={hecho.id}
                                                                    id={hecho.id}
                                                                    value={hecho.value}
                                                                    placeholder="Descripcion del hecho"
                                                                    onChange={(id: string, value: string) => dispatch({ type: 'UPDATE_HECHO', payload: { id, value } })}
                                                                    onRemove={(id: string) => dispatch({ type: 'REMOVE_HECHO', payload: id })}
                                                                />
                                                            ))}
                                                        </SortableContext>
                                                    </DndContext>
                                                    <button className="btn btn-outline btn-primary" type="button" onClick={() => dispatch({ type: 'ADD_HECHO' })}>
                                                        Agregar hecho
                                                    </button>
                                                </div>
                                            )}

                                            {currentStep === 4 && (
                                                <div className="space-y-4">
                                                    <div className="surface-panel bg-base-200/30 p-4">
                                                        <h3 className="text-base font-bold">Resumen rapido</h3>
                                                        <ul className="mt-3 space-y-2 text-sm text-base-content/80">
                                                            <li>Actuacion previa: {isActuacionComplete ? actuacionPrevia : 'No registra'}</li>
                                                            <li>Quien solicita: {isSolicitanteComplete ? solicitante.nombre : 'pendientes'}</li>
                                                            <li>Hechos: {hechos.length}</li>
                                                            <li>Peticiones: {peticiones.length}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="divider-soft mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                                                <div>
                                                    {!isLastStep && (
                                                        <button
                                                            className="btn btn-primary"
                                                            type="button"
                                                            onClick={goToNextStep}
                                                            disabled={!sectionCompletion[currentStep]}
                                                        >
                                                            Siguiente
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap justify-end gap-3">
                                                    <button className="btn btn-neutral" type="button" onClick={() => dispatch({ type: 'INSERT_SAMPLE_DATA' })}>
                                                        Llenar form
                                                    </button>
                                                    {isLastStep && (
                                                        <button className="btn btn-success" type="button" onClick={() => generateDocument(state)}>
                                                            Generar documento
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>
        </section>
    );
};