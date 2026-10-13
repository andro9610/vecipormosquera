import React, { type ReactNode, useReducer } from "react";
import type { ContextValue } from "../../../../types/contextValue";
import { RequirementsContext } from "./requirementsContext";
import requirementsReducer, { initialState } from "../states/requirementsReducer";
import type { MunicipioInfo } from "../types/municipioInfo";

type RequirementsProviderProps = {
  children: ReactNode;
  initialMunicipio?: MunicipioInfo;
};

export const RequirementsProvider: React.FC<RequirementsProviderProps> = ({ children, initialMunicipio }) => {
  const [state, dispatch] = useReducer(
    requirementsReducer,
    initialMunicipio ? { ...initialState, municipio: initialMunicipio } : initialState
  );

  const value: ContextValue = {
    state,
    dispatch,
  };

  return <RequirementsContext.Provider value={value}>{children}</RequirementsContext.Provider>;
};
