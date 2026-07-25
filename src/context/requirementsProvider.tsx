import React, { type ReactNode, useReducer } from 'react';
import type { ContextValue } from '../types/contextValue';
import { RequirementsContext } from './requirementsContext';
import requirementsReducer, { initialState } from '../reducers/requirementsReducer';

export const RequirementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(requirementsReducer, initialState);

    const value: ContextValue = {
        state,
        dispatch,
    };

    return <RequirementsContext.Provider value={value}>{children}</RequirementsContext.Provider>;
};
