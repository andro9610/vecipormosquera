import type { Dispatch } from 'react';
import type { ReconsiderationAction } from './reconsiderationAction';
import type { ReconsiderationState } from './reconsiderationState';

export type ReconsiderationContextValue = {
    state: ReconsiderationState;
    dispatch: Dispatch<ReconsiderationAction>;
};
