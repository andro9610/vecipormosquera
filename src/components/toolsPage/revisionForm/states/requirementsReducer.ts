import type { SortableTextItem } from '../../../../types/sortableTextItem';
import { createItem, reorderItems } from '../../../../utilities/textAreaUtilities';

export type RequirementsState = {
    actuacionPrevia: string;
    solicitante: {
        tratamiento: string;
        nombre: string;
        cedula: string;
        direccion: string;
        identificador: string;
        numeroIdentificacion: string;
        celular: string;
        correo: string;
    };
    peticiones: SortableTextItem[];
    hechos: SortableTextItem[];
    anexos: string[];
};

export type RequirementsAction =
    | { type: 'HYDRATE_REQUIREMENTS'; payload: RequirementsState }
    | { type: 'SET_ACTUACION_PREVIA'; payload: string }
    | { type: 'SET_SOLICITANTE_FIELD'; payload: { field: keyof RequirementsState['solicitante']; value: string } }
    | { type: 'SET_ANEXOS'; payload: string[] }
    | { type: 'ADD_PETICION' }
    | { type: 'REMOVE_PETICION'; payload: string }
    | { type: 'UPDATE_PETICION'; payload: { id: string; value: string } }
    | { type: 'REORDER_PETICIONES'; payload: { activeId: string; overId: string } }
    | { type: 'ADD_HECHO' }
    | { type: 'ADD_HECHO_WITH_VALUE'; payload?: string }
    | { type: 'REMOVE_HECHO'; payload: string }
    | { type: 'UPDATE_HECHO'; payload: { id: string; value: string } }
    | { type: 'REORDER_HECHOS'; payload: { activeId: string; overId: string } }

export const initialState: RequirementsState = {
    actuacionPrevia: '',
    solicitante: {
        tratamiento: 'Sr',
        nombre: '',
        cedula: '',
        direccion: '',
        identificador: '',
        numeroIdentificacion: '',
        celular: '',
        correo: '',
    },
    peticiones: [createItem()],
    hechos: [createItem()],
    anexos: [],
};

export default function requirementsReducer(
    state: RequirementsState = initialState,
    action: RequirementsAction
): RequirementsState {
    switch (action.type) {
        case 'HYDRATE_REQUIREMENTS':
            return action.payload;

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

        case 'SET_ANEXOS':
            return {
                ...state,
                anexos: action.payload,
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
                    : state.peticiones.map((peticion) =>
                        peticion.id === action.payload ? { ...peticion, value: '' } : peticion
                    ),
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

        case 'ADD_HECHO_WITH_VALUE': {
            const newItem = { id: crypto.randomUUID(), value: action.payload ?? '' } as SortableTextItem;
            return {
                ...state,
                hechos: [...state.hechos, newItem],
            };
        }

        case 'REMOVE_HECHO':
            return {
                ...state,
                hechos: state.hechos.length > 1
                    ? state.hechos.filter((hecho) => hecho.id !== action.payload)
                    : state.hechos.map((hecho) =>
                        hecho.id === action.payload ? { ...hecho, value: '' } : hecho
                    ),
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
        default:
            return state;
    }
}
