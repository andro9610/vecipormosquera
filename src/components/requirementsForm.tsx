import { useState } from 'react';
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { handleDragEnd, SortableTextareaItem } from '../fragments/sortableTextAreaItem';
import { useRequirementContext } from '../context/requirementsContext';
import { useDocumentTools } from '../hooks/generateDocument';
import { MaterialIcon } from './MaterialIcon';

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
            key: 'hechos',
            title: 'Hechos',
            helper: 'Escribir los hechos en orden cronologico, del mas antiguo al mas reciente, y de manera clara para que cada uno sea entendible.',
            required: true,
        },
        {
            key: 'peticiones',
            title: 'Peticiones',
            helper: 'Escribir las peticiones o preguntas de la manera mas clara posible, utilizando al inicio frases como se me informe, se me indique, o se me senale.',
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
    const isFirstStep = currentStep === 0;

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

    const goToPreviousStep = () => setCurrentStep((step) => Math.max(step - 1, 0));
    const goToNextStep = () => setCurrentStep((step) => Math.min(step + 1, steps.length - 1));

    return (
        <section className="surface-organic mx-auto w-full max-w-4xl p-4 m-4 backdrop-blur md:p-8">
            <header className="divider-soft mb-6 flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <MaterialIcon icon="search_insights" weight={600} opticalSize={30} label="Formulario de solicitud" />
                    </span>
                    <div>
                        <h4 className="text-2xl leading-tight text-base-content sm:text-3xl">SOLICITUD DE REVISION DE AVALUO CATASTRAL</h4>
                    </div>
                </div>
            </header>

            <section
                className="surface-panel overflow-hidden rounded-2xl border border-base-200/60 bg-base-100 shadow-sm"
                data-stepper={`{"currentIndex": ${currentStep + 1}, "mode": "non-linear"}`}
            >
                <div className="border-b border-base-200/60 p-4 md:p-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content text-sm font-bold">
                                {currentStep + 1}
                            </span>
                            <div className="min-w-0">
                                <span className="block text-[11px] uppercase tracking-[0.15em] text-base-content/55">Paso {currentStep + 1} de {steps.length}</span>
                                <span className="mt-0.5 flex items-center gap-2 text-base font-semibold text-base-content">
                                    {steps[currentStep].title}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-base-content/80 text-justify">
                            {steps[currentStep].helper}
                        </p>
                    </div>
                </div>

                <div className="p-4 md:p-5">
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
                        <div className="space-y-4">
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
                        </div>
                    )}

                    {currentStep === 2 && (
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
                            <div className="flex justify-center">
                                <button className="btn btn-outline" type="button" onClick={() => dispatch({ type: 'ADD_HECHO' })}>
                                    <MaterialIcon icon="add" opticalSize={20} className="mr-1" aria-hidden="true" />
                                    Agregar hecho
                                </button>
                            </div>

                        </div>
                    )}

                    {currentStep === 3 && (
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
                            <div className="flex justify-center">
                                <button className="btn btn-outline" type="button" onClick={() => dispatch({ type: 'ADD_PETICION' })}>
                                    <MaterialIcon icon="add" opticalSize={20} className="mr-1" aria-hidden="true" />
                                    Agregar peticion
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-4">
                            <div className="surface-panel bg-base-200/30 p-4">
                                <ul className="mt-3 space-y-2 text-sm text-base-content/80">
                                    <li><b>Actuacion previa:</b> {isActuacionComplete ? actuacionPrevia : 'No registra'}</li>
                                    <li><b>Quien solicita:</b> {isSolicitanteComplete ? solicitante.nombre : 'pendientes'}</li>
                                    <li><b>Hechos:</b> {hechos.length}</li>
                                    <li><b>Peticiones:</b> {peticiones.length}</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="divider-soft mt-6 flex flex-wrap justify-end gap-3 border-t pt-5">
                        <div className="flex flex-wrap justify-end gap-3">
                            {!isFirstStep &&
                                <button className="btn btn-secondary" type="button" onClick={goToPreviousStep} disabled={currentStep === 0}>
                                    <MaterialIcon icon="chevron_left" opticalSize={20} className="mr-1" aria-hidden="true" />
                                    Anterior
                                </button>
                            }
                            <button className="btn btn-outline" type="button" onClick={() => dispatch({ type: 'INSERT_SAMPLE_DATA' })}>
                                <MaterialIcon icon="auto_fix_high" opticalSize={20} className="mr-1" aria-hidden="true" />
                                Llenar form
                            </button>
                            {!isLastStep && (
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={goToNextStep}
                                    disabled={!sectionCompletion[currentStep]}
                                >
                                    <MaterialIcon icon="chevron_right" opticalSize={20} className="mr-1" aria-hidden="true" />
                                    Siguiente
                                </button>
                            )}
                            {isLastStep && (
                                <button className="btn btn-neutral" type="button" onClick={() => generateDocument(state)}>
                                    <MaterialIcon icon="file_save" opticalSize={20} className="mr-1" aria-hidden="true" />
                                    Generar documento
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </section>
        </section>
    );
};