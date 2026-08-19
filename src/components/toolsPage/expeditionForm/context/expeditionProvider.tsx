import React, { type ReactNode, useReducer } from "react";
import { expeditionReducer, initialExpeditionState } from "../states/expeditionReducer";
import type { ExpeditionContextValue } from "../types/expeditionContextValue";
import { ExpeditionContext } from "./expeditionContext";

export const ExpeditionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(expeditionReducer, initialExpeditionState);

  const value: ExpeditionContextValue = {
    state,
    dispatch,
  };

  return <ExpeditionContext.Provider value={value}>{children}</ExpeditionContext.Provider>;
};
