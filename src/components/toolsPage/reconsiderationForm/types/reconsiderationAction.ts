import type { ReconsiderationState } from "./reconsiderationState";

export type ReconsiderationAction =
    | { type: 'HYDRATE_REQUIREMENTS'; payload: ReconsiderationState }
    | { type: 'SET_ACTUACION_PREVIA'; payload: string }
    | { type: 'SET_SOLICITANTE_FIELD'; payload: { field: keyof ReconsiderationState['solicitante']; value: string | boolean } }
    | { type: 'SET_ANEXOS'; payload: string[] }
    | { type: 'ADD_PETICION' }
    | { type: 'REMOVE_PETICION'; payload: string }
    | { type: 'UPDATE_PETICION'; payload: { id: string; value: string } }
    | { type: 'REORDER_PETICIONES'; payload: { activeId: string; overId: string } }
    | { type: 'ADD_HECHO' }
    | { type: 'REMOVE_HECHO'; payload: string }
    | { type: 'UPDATE_HECHO'; payload: { id: string; value: string } }
    | { type: 'REORDER_HECHOS'; payload: { activeId: string; overId: string } };