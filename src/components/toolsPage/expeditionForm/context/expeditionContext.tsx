import { createWizardContext } from "../../../../fragments/forms/context/createWizardContext";
import type { ExpeditionAction, ExpeditionState } from "../../../../types/toolsForms";
import { expeditionReducer, initialExpeditionState } from "../states/expeditionReducer";

export const { Provider: ExpeditionProvider, useWizardContext: useExpeditionContext } = createWizardContext<
  ExpeditionState,
  ExpeditionAction
>(expeditionReducer, initialExpeditionState);
