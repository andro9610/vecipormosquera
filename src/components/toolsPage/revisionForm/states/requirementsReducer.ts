import type { RequirementsAction, RequirementsState } from "../../../../types/toolsForms";
import {
  addItem,
  createItem,
  createItemWithValue,
  removeItem,
  reorderItems,
  updateField,
  updateItemValue,
} from "../../../../utilities/textAreaUtilities";

export const initialState: RequirementsState = {
  actuacionPrevia: "",
  solicitante: {
    tratamiento: "Sr",
    actuaComo: true,
    nombre: "",
    cedula: "",
    direccion: "",
    celular: "",
    correo: "",
  },
  municipio: {
    departamento: "",
    municipio: "",
    gestorCatastral: "",
    correoGestorCatastral: "",
  },
  peticiones: [createItem()],
  hechos: [createItem()],
  anexos: [],
};

const requirementsReducer = (state: RequirementsState = initialState, action: RequirementsAction): RequirementsState => {
  switch (action.type) {
    case "SET_ACTUACION_PREVIA":
      return { ...state, actuacionPrevia: action.payload };

    case "SET_SOLICITANTE_FIELD":
      return { ...state, solicitante: updateField(state.solicitante, action.payload.field, action.payload.value) };

    case "SET_MUNICIPIO_FIELD":
      return { ...state, municipio: updateField(state.municipio, action.payload.field, action.payload.value) };

    case "SET_ANEXOS":
      return { ...state, anexos: action.payload };

    case "ADD_PETICION":
      return { ...state, peticiones: addItem(state.peticiones, createItem()) };

    case "REMOVE_PETICION":
      return { ...state, peticiones: removeItem(state.peticiones, action.payload) };

    case "UPDATE_PETICION":
      return { ...state, peticiones: updateItemValue(state.peticiones, action.payload) };

    case "REORDER_PETICIONES":
      return { ...state, peticiones: reorderItems(state.peticiones, action.payload.activeId, action.payload.overId) };

    case "ADD_HECHO_WITH_VALUE":
      return { ...state, hechos: addItem(state.hechos, createItemWithValue(action.payload)) };

    case "REMOVE_HECHO":
      return { ...state, hechos: removeItem(state.hechos, action.payload) };

    case "UPDATE_HECHO":
      return { ...state, hechos: updateItemValue(state.hechos, action.payload) };

    case "REORDER_HECHOS":
      return { ...state, hechos: reorderItems(state.hechos, action.payload.activeId, action.payload.overId) };

    default:
      return state;
  }
};

export default requirementsReducer;
