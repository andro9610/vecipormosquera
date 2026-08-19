import type { ExpeditionState } from "./expeditionState";

export type ExpeditionAction =
  | { type: "HYDRATE_EXPEDITION"; payload: ExpeditionState }
  | {
      type: "SET_SOLICITANTE_FIELD";
      payload: { field: keyof ExpeditionState["solicitante"]; value: string | boolean };
    }
  | {
      type: "SET_PREDIO_FIELD";
      payload: { field: keyof ExpeditionState["predio"]; value: string };
    };
