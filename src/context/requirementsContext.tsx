import { createContext, useContext } from 'react';
import { type ContextValue } from '../types/contextValue';

export const RequirementsContext = createContext<ContextValue | undefined>(undefined);

export const useRequirementContext = (): ContextValue => {
    const context = useContext(RequirementsContext);

    if (!context) {
        throw new Error('Entorno sin contexto');
    }

    return context;
};
