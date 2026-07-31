import type { Dispatch } from 'react';
import type { ReconsiderationAction, ReconsiderationState } from '../reducers/reconsiderationReducer';

export type ReconsiderationContextValue = {
    state: ReconsiderationState;
    dispatch: Dispatch<ReconsiderationAction>;
};
