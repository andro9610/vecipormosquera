import type { SortableTextItem } from '../types/sortableTextItem';

export type RequirementsState = {
    actuacionPrevia: string;
    solicitante: {
        tratamiento: string;
        nombre: string;
        cedula: string;
        direccion: string;
        celular: string;
        correo: string;
    };
    peticiones: SortableTextItem[];
    hechos: SortableTextItem[];
};

export type RequirementsAction =
    | { type: 'SET_ACTUACION_PREVIA'; payload: string }
    | { type: 'SET_SOLICITANTE_FIELD'; payload: { field: keyof RequirementsState['solicitante']; value: string } }
    | { type: 'ADD_PETICION' }
    | { type: 'REMOVE_PETICION'; payload: string }
    | { type: 'UPDATE_PETICION'; payload: { id: string; value: string } }
    | { type: 'REORDER_PETICIONES'; payload: { activeId: string; overId: string } }
    | { type: 'ADD_HECHO' }
    | { type: 'REMOVE_HECHO'; payload: string }
    | { type: 'UPDATE_HECHO'; payload: { id: string; value: string } }
    | { type: 'REORDER_HECHOS'; payload: { activeId: string; overId: string } }
    | { type: 'INSERT_SAMPLE_DATA' };
const createItem = (): SortableTextItem => ({ id: crypto.randomUUID(), value: '' });

const reorderItems = <T extends { id: string }>(items: T[], activeId: string, overId: string): T[] => {
    const oldIndex = items.findIndex((item) => item.id === activeId);
    const newIndex = items.findIndex((item) => item.id === overId);

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return items;
    }

    const nextItems = [...items];
    const [movedItem] = nextItems.splice(oldIndex, 1);
    const targetIndex = oldIndex < newIndex ? newIndex - 1 : newIndex;
    nextItems.splice(targetIndex, 0, movedItem);

    return nextItems;
};

export const initialState: RequirementsState = {
    actuacionPrevia: '',
    solicitante: {
        tratamiento: '',
        nombre: '',
        cedula: '',
        direccion: '',
        celular: '',
        correo: '',
    },
    peticiones: [createItem()],
    hechos: [createItem()],
};

export default function requirementsReducer(
    state: RequirementsState = initialState,
    action: RequirementsAction
): RequirementsState {
    switch (action.type) {
        case 'SET_ACTUACION_PREVIA':
            return {
                ...state,
                actuacionPrevia: action.payload,
            };

        case 'SET_SOLICITANTE_FIELD':
            return {
                ...state,
                solicitante: {
                    ...state.solicitante,
                    [action.payload.field]: action.payload.value,
                },
            };

        case 'ADD_PETICION':
            return {
                ...state,
                peticiones: [...state.peticiones, createItem()],
            };

        case 'REMOVE_PETICION':
            return {
                ...state,
                peticiones: state.peticiones.length > 1
                    ? state.peticiones.filter((peticion) => peticion.id !== action.payload)
                    : state.peticiones,
            };

        case 'UPDATE_PETICION':
            return {
                ...state,
                peticiones: state.peticiones.map((peticion) =>
                    peticion.id === action.payload.id ? { ...peticion, value: action.payload.value } : peticion
                ),
            };

        case 'REORDER_PETICIONES': {
            return {
                ...state,
                peticiones: reorderItems(state.peticiones, action.payload.activeId, action.payload.overId),
            };
        }

        case 'ADD_HECHO':
            return {
                ...state,
                hechos: [...state.hechos, createItem()],
            };

        case 'REMOVE_HECHO':
            return {
                ...state,
                hechos: state.hechos.length > 1
                    ? state.hechos.filter((hecho) => hecho.id !== action.payload)
                    : state.hechos,
            };

        case 'UPDATE_HECHO':
            return {
                ...state,
                hechos: state.hechos.map((hecho) =>
                    hecho.id === action.payload.id ? { ...hecho, value: action.payload.value } : hecho
                ),
            };

        case 'REORDER_HECHOS': {
            return {
                ...state,
                hechos: reorderItems(state.hechos, action.payload.activeId, action.payload.overId),
            };
        }
        //TODO: Eliminar al completar
        case 'INSERT_SAMPLE_DATA':
            return {
                ...state,
                actuacionPrevia: 'Solicitud de revisión de la actuación administrativa',
                solicitante: {
                    tratamiento: 'Sr',
                    nombre: 'Juan Pérez',
                    cedula: '1234567890',
                    direccion: 'Calle Falsa 123',
                    celular: '0987654321',
                    correo: 'correo@dominio.com',
                },
                peticiones: [
                    { id: crypto.randomUUID(), value: 'Que se declare la nulidad de la resolución impugnada.' },
                    { id: crypto.randomUUID(), value: 'Que se ordene la devolución de los valores pagados indebidamente.' },
                ],
                hechos: [
                    { id: crypto.randomUUID(), value: 'El 1 de enero de 2024, el solicitante presentó una solicitud de revisión.' },
                    { id: crypto.randomUUID(), value: 'El 15 de enero de 2024, la autoridad emitió una resolución desfavorable.' },
                ],
            };

        default:
            return state;
    }
}
