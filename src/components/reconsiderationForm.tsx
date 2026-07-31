import { useReconsiderationContext } from '../context/reconsiderationContext';
import { useDocumentTools } from '../hooks/generateDocument';
import { Wizard, type WizardStep } from '../fragments/wizard';
import type { ReconsiderationState } from '../reducers/reconsiderationReducer';
import { Attachements } from './reconsiderationForm/attachments';
import { ClaimantInfo } from './reconsiderationForm/claimantInfo';
import { Facts } from './reconsiderationForm/facts';
import { PreviousAct } from './reconsiderationForm/previousAct';
import { Requirements } from './reconsiderationForm/requirements';
import { Resume } from './reconsiderationForm/resume';

export const ReconsiderationForm = () => {
    const { state, dispatch } = useReconsiderationContext();
    const { actuacionPrevia, solicitante, peticiones, hechos, anexos } = state;
    const { generateDocument } = useDocumentTools();

    const hasFilledItems = (items: Array<{ value: string }>) => items.some((item) => item.value.trim().length > 0);
    const isActuacionComplete = actuacionPrevia.trim().length > 0;
    const isSolicitanteComplete = [
        solicitante.tratamiento,
        solicitante.nombre,
        solicitante.cedula,
        solicitante.direccion,
        solicitante.identificador,
        solicitante.numeroIdentificacion,
        solicitante.celular,
        solicitante.correo,
    ].every((field) => String(field).trim().length > 0);
    const isPeticionesComplete = hasFilledItems(peticiones);
    const isHechosComplete = hasFilledItems(hechos);

    const handleFillForm = () => {
        const createItem = (value: string) => ({ id: crypto.randomUUID(), value });

        const sampleState: ReconsiderationState = {
            actuacionPrevia: 'Resolucion predial 2026-145 del 15 de enero de 2026',
            solicitante: {
                tratamiento: 'Sr',
                nombre: 'Juan Camilo Perez',
                cedula: '1022334455',
                direccion: 'Calle 12 # 45-67, Mosquera',
                identificador: 'Matricula',
                numeroIdentificacion: '50C-123456',
                celular: '3001234567',
                correo: 'juan.perez@correo.com',
            },
            hechos: [
                createItem('El predio fue liquidado con un avaluo superior al comportamiento comercial del sector.'),
                createItem('No se tuvieron en cuenta las limitaciones urbanisticas reportadas en la ficha tecnica.'),
            ],
            peticiones: [
                createItem('Se revise y corrija el avaluo catastral asignado al predio.'),
                createItem('Se informe por escrito el sustento tecnico y normativo de la nueva liquidacion.'),
            ],
            anexos: ['Avaluo_comercial_enero_2026.pdf', 'Ficha_tecnica_predio.pdf', 'Registro_fotografico.zip'],
        };

        dispatch({ type: 'HYDRATE_REQUIREMENTS', payload: sampleState });
    };

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
            key: 'fundamentos',
            title: 'Fundamentos de hecho y de derecho',
            helper: 'Narrar los hechos de manera cronológica del más antiguo al más reciente, apoyándolos de argumentación jurídica de las razones por las que el impuesto está mal liquidado, está mal formulado o hay algún yerro y por ello, se requiere su modificación parcial o total. Para ello, se puede apoyar del normograma que va adjunto al paquete de minutas entregado junto a la presente. ',
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
            helper: 'Indicar la naturaleza de la petición',
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
            key: 'anexos',
            title: 'Anexos',
            helper: 'Aqui se anexaran los documentos que soportan la solicitud de reconsideración, si aplican.',
            canContinue: true,
            content: (
                <Attachements
                    attachmentNames={anexos}
                    onAttachmentsChange={(attachmentNames) => dispatch({
                        type: 'SET_ANEXOS',
                        payload: attachmentNames,
                    })}
                />
            ),
        },
        {
            key: 'resumen',
            title: 'Resumen',
            helper: 'Revise la informacion registrada antes de generar el documento final.',
            canContinue: isActuacionComplete && isSolicitanteComplete && isPeticionesComplete && isHechosComplete,
            content: (
                <Resume
                    actuacionPrevia={actuacionPrevia}
                    solicitanteNombre={solicitante.nombre}
                    identificador={solicitante.identificador}
                    numeroIdentificacion={solicitante.numeroIdentificacion}
                    hechosCount={hechos.length}
                    peticionesCount={peticiones.length}
                    anexosCount={anexos.length}
                    isActuacionComplete={isActuacionComplete}
                    isSolicitanteComplete={isSolicitanteComplete}
                />
            ),
        }

    ];

    return (
        <div className="space-y-3">
            <div className="mx-auto w-full max-w-4xl px-4 md:px-0">
                <button type="button" className="btn btn-outline" onClick={handleFillForm}>
                    Llenar formulario
                </button>
            </div>
            <Wizard
                title="SOLICITUD DE RECONSIDERACIÓN"
                steps={steps}
                finishLabel="Generar documento"
                onFinish={() => generateDocument('reconsideracion', state)}
            />
        </div>
    );
};