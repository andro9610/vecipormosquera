import React, { type ReactNode, useReducer } from 'react';
import reconsiderationReducer, { initialReconsiderationState } from '../reducers/reconsiderationReducer';
import type { ReconsiderationContextValue } from '../types/reconsiderationContextValue';
import { ReconsiderationContext } from './reconsiderationContext';

export const ReconsiderationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reconsiderationReducer, initialReconsiderationState);

    const value: ReconsiderationContextValue = {
        state,
        dispatch,
    };

    return <ReconsiderationContext.Provider value={value}>{children}</ReconsiderationContext.Provider>;
};
