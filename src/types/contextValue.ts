import type { Dispatch } from 'react';
import type { RequirementsAction, RequirementsState } from '../components/toolsPage/revisionForm/states/requirementsReducer';

export type ContextValue = {
    state: RequirementsState;
    dispatch: Dispatch<RequirementsAction>;
};