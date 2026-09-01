import type { Dispatch } from 'react';
import type { RequirementsAction, RequirementsState } from '../components/toolsPage/revisionForm/states/requirementsReducer';
// TODO: Mover el archivo de tipos a un contexto mas local. Este tipo no es universal
export type ContextValue = {
    state: RequirementsState;
    dispatch: Dispatch<RequirementsAction>;
};