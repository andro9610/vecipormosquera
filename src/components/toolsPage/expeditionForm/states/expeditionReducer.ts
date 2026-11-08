import type { ExpeditionAction, ExpeditionState } from "../../../../types/toolsForms";
import { updateField } from "../../../../utilities/textAreaUtilities";

export const initialExpeditionState: ExpeditionState = {
  solicitante: {
    tratamiento: "Sr",
    actuaComo: true,
    nombre: "",
    cedula: "",
    direccion: "",
    celular: "",
    correo: "",
  },
  predio: {
    identificador: "",
    numeroIdentificacion: "",
    direccion: "",
  },
};

export const expeditionReducer = (
  state: ExpeditionState = initialExpeditionState,
  action: ExpeditionAction,
): ExpeditionState => {
  switch (action.type) {
    case "SET_SOLICITANTE_FIELD":
      return { ...state, solicitante: updateField(state.solicitante, action.payload.field, action.payload.value) };

    case "SET_PREDIO_FIELD":
      return { ...state, predio: updateField(state.predio, action.payload.field, action.payload.value) };

    default:
      return state;
  }
};
