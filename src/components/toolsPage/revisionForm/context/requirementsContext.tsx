import { createWizardContext } from "../../../../fragments/forms/context/createWizardContext";
import type { RequirementsAction, RequirementsState } from "../../../../types/toolsForms";
import requirementsReducer, { initialState } from "../states/requirementsReducer";

export const { Provider: RequirementsProvider, useWizardContext: useRequirementContext } = createWizardContext<
  RequirementsState,
  RequirementsAction
>(requirementsReducer, initialState);
