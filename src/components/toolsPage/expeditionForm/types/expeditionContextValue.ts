import type { Dispatch } from "react";
import type { ExpeditionAction } from "./expeditionAction";
import type { ExpeditionState } from "./expeditionState";

export type ExpeditionContextValue = {
  state: ExpeditionState;
  dispatch: Dispatch<ExpeditionAction>;
};
