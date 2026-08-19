import { createContext, useContext } from "react";
import type { ExpeditionContextValue } from "../types/expeditionContextValue";

export const ExpeditionContext = createContext<ExpeditionContextValue | undefined>(undefined);

export const useExpeditionContext = (): ExpeditionContextValue => {
  const context = useContext(ExpeditionContext);

  if (!context) {
    throw new Error("Entorno sin contexto de expedicion");
  }

  return context;
};
