import { useNavigate } from "react-router-dom";
import { Note } from "../../../fragments/note/note";
import {
  createAttachmentsStep,
  createClaimantStep,
  createFactsStep,
  createNextStepsStep,
  createPeticionesStep,
  createPreviousActStep,
  createSummaryStep,
} from "../../../fragments/forms/wizardStepFactory";
import { SummaryPanel, SummarySection } from "../../../fragments/forms/summaryPanel";
import { Wizard } from "../../../fragments/wizard/wizard";
import type { WizardStep } from "../../../fragments/wizard/types/wizardStep";
import { generateDocument } from "../../../utilities/documents/generateDocument";
import { buildSupportsText } from "../../../utilities/textUtilities";
import { areFieldsFilled, hasFilledItems, isFilled } from "../../../utilities/validationUtilities";
import { NO_REGISTRA, SUGGESTION_FORMS } from "../const/const";
import { MunicipioInfo } from "./components/municipioInfo";
import { useRequirementContext } from "./context/requirementsContext";

type RevisionFormProps = {
  isBackdoor?: boolean;
};

export const RevisionForm = ({ isBackdoor = false }: RevisionFormProps) => {
  const showMunicipioStep = isBackdoor;
  const { state, dispatch } = useRequirementContext();
  const { actuacionPrevia, solicitante, peticiones, hechos, anexos, municipio } = state;
  const navigate = useNavigate();

  const isActuacionComplete = isFilled(actuacionPrevia);
  const isSolicitanteComplete = areFieldsFilled(solicitante, [
    "tratamiento",
    "nombre",
    "cedula",
    "direccion",
    "celular",
    "correo",
  ]);
  const isPeticionesComplete = hasFilledItems(peticiones);
  const isHechosComplete = hasFilledItems(hechos);
  const isMunicipioComplete = areFieldsFilled(municipio, [
    "departamento",
    "municipio",
    "gestorCatastral",
    "correoGestorCatastral",
  ]);
  const hasMunicipioData = showMunicipioStep && (municipio.departamento.trim() || municipio.municipio.trim());

  const steps: WizardStep[] = [];

  if (showMunicipioStep) {
    steps.push({
      key: "municipio",
      title: "Datos del municipio",
      helper:
        "Indique el departamento, el municipio, el gestor catastral y el correo del gestor catastral a quien se dirige la solicitud.",
      canContinue: isMunicipioComplete,
      content: (
        <MunicipioInfo
          value={municipio}
          onChangeField={(field, value) => dispatch({ type: "SET_MUNICIPIO_FIELD", payload: { field, value } })}
        />
      ),
    });
  }

  const supports = buildSupportsText([
    { count: hechos.length, singular: "hecho", plural: "hechos" },
    { count: peticiones.length, singular: "peticion", plural: "peticiones" },
    { count: anexos.length, singular: "anexo", plural: "anexos" },
  ]);

  steps.push(
    createPreviousActStep({
      value: actuacionPrevia,
      onChange: (value) => dispatch({ type: "SET_ACTUACION_PREVIA", payload: value }),
      suggestionForm: SUGGESTION_FORMS.revision,
      canContinue: true,
    }),
    createClaimantStep({
      value: solicitante,
      onChangeField: (field, value) => dispatch({ type: "SET_SOLICITANTE_FIELD", payload: { field, value } }),
      canContinue: isSolicitanteComplete,
    }),
    createFactsStep({
      items: hechos,
      suggestionForm: SUGGESTION_FORMS.revision,
      canContinue: isHechosComplete,
      onAdd: (initialValue) => dispatch({ type: "ADD_HECHO_WITH_VALUE", payload: initialValue }),
      onUpdate: (id, value) => dispatch({ type: "UPDATE_HECHO", payload: { id, value } }),
      onRemove: (id) => dispatch({ type: "REMOVE_HECHO", payload: id }),
      onReorder: (activeId, overId) => dispatch({ type: "REORDER_HECHOS", payload: { activeId, overId } }),
    }),
    createPeticionesStep({
      items: peticiones,
      suggestionForm: SUGGESTION_FORMS.revision,
      canContinue: isPeticionesComplete,
      onAdd: () => dispatch({ type: "ADD_PETICION" }),
      onUpdate: (id, value) => dispatch({ type: "UPDATE_PETICION", payload: { id, value } }),
      onRemove: (id) => dispatch({ type: "REMOVE_PETICION", payload: id }),
      onReorder: (activeId, overId) => dispatch({ type: "REORDER_PETICIONES", payload: { activeId, overId } }),
    }),
    createAttachmentsStep({
      attachmentNames: anexos,
      onAttachmentsChange: (attachmentNames) => dispatch({ type: "SET_ANEXOS", payload: attachmentNames }),
      suggestionForm: SUGGESTION_FORMS.revision,
      helper:
        "(Opcional recomendado) Aqui se anexaran los documentos que soportan la solicitud de revision, si aplican.",
    }),
    createSummaryStep({
      canContinue:
        isSolicitanteComplete && isPeticionesComplete && isHechosComplete && (!showMunicipioStep || isMunicipioComplete),
      onNext: () => generateDocument("revision", state, { skipCounter: isBackdoor }),
      content: (
        <div className="space-y-4">
          <SummaryPanel>
            {isActuacionComplete ? `Dada la actuación previa ${actuacionPrevia}, ` : ""}
            <strong>{isSolicitanteComplete ? solicitante.nombre : "N/N"}</strong>
            {` presenta solicitud de revisión${supports}`}
          </SummaryPanel>
          {hasMunicipioData && (
            <SummarySection
              title="DATOS DEL MUNICIPIO"
              items={[
                { label: "Departamento", value: municipio.departamento || NO_REGISTRA },
                { label: "Municipio", value: municipio.municipio || NO_REGISTRA },
                { label: "Gestor catastral", value: municipio.gestorCatastral || NO_REGISTRA },
                {
                  label: "Correo del gestor catastral",
                  value: municipio.correoGestorCatastral || NO_REGISTRA,
                },
              ]}
            />
          )}
        </div>
      ),
    }),
    createNextStepsStep(
      <Note variant="info">
        Recuerda radicar esta solicitud ante tu gestor catastral de manera presencial o por correo electronico. La
        información de tu gestor esta en el contenido del documento que generaste.
      </Note>,
    ),
  );

  return (
    <Wizard
      icon="map_search"
      title="SOLICITUD DE REVISION DE AVALUO CATASTRAL"
      steps={steps}
      onFinish={() => navigate("/tools")}
    />
  );
};
