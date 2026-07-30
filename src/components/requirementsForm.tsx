import { useRequirementContext } from '../context/requirementsContext';
import { useDocumentTools } from '../hooks/generateDocument';
import { Wizard, type WizardStep } from '../fragments/wizard';
import { PreviousAct } from './revisionForm/previousAct';
import { ClaimantInfo } from './revisionForm/claimantInfo';
import { Facts } from './revisionForm/facts';
import { Requirements } from './revisionForm/requirements';
import { Resume } from './revisionForm/resume';

export const RequirementsForm = () => {
    const { state, dispatch } = useRequirementContext();
    const { actuacionPrevia, solicitante, peticiones, hechos } = state;
    const { generateDocument } = useDocumentTools();

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

    const steps: WizardStep[] = [
        {
            key: 'actuacion',
            title: 'Actuacion previa',
            helper: 'Aqui puede indicar cual es la actuacion o documento que motiva la solicitud',
            canContinue: true,
            content: (
                <PreviousAct
                    value={actuacionPrevia}
                    onChange={(value) => dispatch({ type: 'SET_ACTUACION_PREVIA', payload: value })}
                />
            ),
        },
        {
            key: 'solicitante',
            title: 'Informacion del solicitante',
            helper: 'En las siguientes direcciones se notificara, comunicara o enviara la respuesta, se recomienda escribir bien las direcciones y asegurarse que sea una direccion reciente o que se revise frecuentemente.',
            canContinue: isSolicitanteComplete,
            content: (
                <ClaimantInfo
                    value={solicitante}
                    onChangeField={(field, value) => dispatch({
                        type: 'SET_SOLICITANTE_FIELD',
                        payload: { field, value },
                    })}
                />
            ),
        },
        {
            key: 'hechos',
            title: 'Hechos',
            helper: 'Escribir los hechos en orden cronologico, del mas antiguo al mas reciente, y de manera clara para que cada uno sea entendible.',
            canContinue: isHechosComplete,
            content: (
                <Facts
                    facts={hechos}
                    onAdd={() => dispatch({ type: 'ADD_HECHO' })}
                    onUpdate={(id, value) => dispatch({ type: 'UPDATE_HECHO', payload: { id, value } })}
                    onRemove={(id) => dispatch({ type: 'REMOVE_HECHO', payload: id })}
                    onReorder={(activeId, overId) => dispatch({
                        type: 'REORDER_HECHOS',
                        payload: { activeId, overId },
                    })}
                />
            ),
        },
        {
            key: 'peticiones',
            title: 'Peticiones',
            helper: 'Escribir las peticiones o preguntas de la manera mas clara posible, utilizando al inicio frases como se me informe, se me indique, o se me senale.',
            canContinue: isPeticionesComplete,
            content: (
                <Requirements
                    requirements={peticiones}
                    onAdd={() => dispatch({ type: 'ADD_PETICION' })}
                    onUpdate={(id, value) => dispatch({ type: 'UPDATE_PETICION', payload: { id, value } })}
                    onRemove={(id) => dispatch({ type: 'REMOVE_PETICION', payload: id })}
                    onReorder={(activeId, overId) => dispatch({
                        type: 'REORDER_PETICIONES',
                        payload: { activeId, overId },
                    })}
                />
            ),
        },
        {
            key: 'resumen',
            title: 'Resumen',
            helper: 'Revise la informacion registrada antes de generar el documento final.',
            canContinue: isSolicitanteComplete && isPeticionesComplete && isHechosComplete,
            content: (
                <Resume
                    actuacionPrevia={actuacionPrevia}
                    solicitanteNombre={solicitante.nombre}
                    hechosCount={hechos.length}
                    peticionesCount={peticiones.length}
                    isActuacionComplete={isActuacionComplete}
                    isSolicitanteComplete={isSolicitanteComplete}
                />
            ),
        },
    ];

    return (
        <Wizard
            title="SOLICITUD DE REVISION DE AVALUO CATASTRAL"
            steps={steps}
            finishLabel="Generar documento"
            onFinish={() => generateDocument(state)}
        />
    );
};