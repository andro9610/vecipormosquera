import { createWizardContext } from "../../../../fragments/forms/context/createWizardContext";
import type { ReconsiderationAction, ReconsiderationState } from "../../../../types/toolsForms";
import { initialReconsiderationState, reconsiderationReducer } from "../states/reconsiderationReducer";

export const { Provider: ReconsiderationProvider, useWizardContext: useReconsiderationContext } =
  createWizardContext<ReconsiderationState, ReconsiderationAction>(
    reconsiderationReducer,
    initialReconsiderationState,
  );
