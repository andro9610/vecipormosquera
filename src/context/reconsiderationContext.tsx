import { createContext, useContext } from 'react';
import type { ReconsiderationContextValue } from '../types/reconsiderationContextValue';

export const ReconsiderationContext = createContext<ReconsiderationContextValue | undefined>(undefined);

export const useReconsiderationContext = (): ReconsiderationContextValue => {
    const context = useContext(ReconsiderationContext);

    if (!context) {
        throw new Error('Entorno sin contexto de reconsideracion');
    }

    return context;
};
