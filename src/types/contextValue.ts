import type { Dispatch } from 'react';
import type { RequirementsAction, RequirementsState } from '../reducers/requirementsReducer';

export type ContextValue = {
    state: RequirementsState;
    dispatch: Dispatch<RequirementsAction>;
};