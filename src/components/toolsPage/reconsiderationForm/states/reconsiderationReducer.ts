import type { ReconsiderationAction, ReconsiderationState } from "../../../../types/toolsForms";
import {
  addItem,
  createItem,
  createItemWithValue,
  removeItem,
  reorderItems,
  updateField,
  updateItemValue,
} from "../../../../utilities/textAreaUtilities";

export const initialReconsiderationState: ReconsiderationState = {
  fechaExpedicion: "",
  actuacionPrevia: "",
  solicitante: {
    tratamiento: "Sr",
    actuaComo: true,
    nombre: "",
    cedula: "",
    direccion: "",
    identificador: "Matricula",
    numeroIdentificacion: "",
    celular: "",
    correo: "",
  },
  hechos: [createItem()],
  anexos: [],
};

export const reconsiderationReducer = (
  state: ReconsiderationState = initialReconsiderationState,
  action: ReconsiderationAction,
): ReconsiderationState => {
  switch (action.type) {
    case "SET_FECHA_EXPEDICION":
      return { ...state, fechaExpedicion: action.payload };

    case "SET_ACTUACION_PREVIA":
      return { ...state, actuacionPrevia: action.payload };

    case "SET_SOLICITANTE_FIELD":
      return { ...state, solicitante: updateField(state.solicitante, action.payload.field, action.payload.value) };

    case "SET_ANEXOS":
      return { ...state, anexos: action.payload };

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
