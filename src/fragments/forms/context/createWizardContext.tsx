import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";

export type WizardContextValue<TState, TAction> = {
  state: TState;
  dispatch: Dispatch<TAction>;
};

type WizardReducer<TState, TAction> = (state: TState, action: TAction) => TState;

type WizardProviderProps<TState> = {
  children: ReactNode;
  overrides?: Partial<TState>;
};

export function createWizardContext<TState, TAction>(
  reducer: WizardReducer<TState, TAction>,
  initialState: TState,
) {
  const Context = createContext<WizardContextValue<TState, TAction> | undefined>(undefined);

  const Provider = ({ children, overrides }: WizardProviderProps<TState>) => {
    const [state, dispatch] = useReducer(reducer, overrides ? { ...initialState, ...overrides } : initialState);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
  };

  const useWizardContext = (): WizardContextValue<TState, TAction> => {
    const context = useContext(Context);

    if (!context) throw new Error("El componente debe estar dentro del provider de su formulario");

    return context;
  };

  return { Provider, useWizardContext };
}
