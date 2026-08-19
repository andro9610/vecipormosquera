import type { ExpeditionAction } from "../types/expeditionAction";
import type { ExpeditionState } from "../types/expeditionState";

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
    case "HYDRATE_EXPEDITION":
      return action.payload;

    case "SET_SOLICITANTE_FIELD":
      return {
        ...state,
        solicitante: {
          ...state.solicitante,
          [action.payload.field]: action.payload.value,
        },
      };

    case "SET_PREDIO_FIELD":
      return {
        ...state,
        predio: {
          ...state.predio,
          [action.payload.field]: action.payload.value,
        },
      };

    default:
      return state;
  }
};
