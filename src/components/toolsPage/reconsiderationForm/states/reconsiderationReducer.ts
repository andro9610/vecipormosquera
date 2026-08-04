import type { ReconsiderationState } from '../types/reconsiderationState';
import type { ReconsiderationAction } from '../types/reconsiderationAction';
import { useTextAreaTools } from '../../../../hooks/useTextAreaTools';

export const initialReconsiderationState: ReconsiderationState = {
	actuacionPrevia: '',
	solicitante: {
		tratamiento: 'Sr',
		actuaComo: true,
		nombre: '',
		cedula: '',
		direccion: '',
		identificador: 'Matricula',
		numeroIdentificacion: '',
		celular: '',
		correo: '',
	},
	hechos: [],
	anexos: [],
};

export const reconsiderationReducer = (
	state: ReconsiderationState = initialReconsiderationState,
	action: ReconsiderationAction
): ReconsiderationState => {
	const { createItem, reorderItems } = useTextAreaTools();

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

		case 'REORDER_HECHOS':
			return {
				...state,
				hechos: reorderItems(state.hechos, action.payload.activeId, action.payload.overId),
			};

		default:
			return state;
	}
}
