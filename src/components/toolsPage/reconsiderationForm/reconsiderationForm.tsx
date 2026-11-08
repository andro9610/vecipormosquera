import { useNavigate } from "react-router-dom";
import { Note } from "../../../fragments/note/note";
import {
  createAttachmentsStep,
  createClaimantStep,
  createFactsStep,
  createNextStepsStep,
  createPreviousActStep,
  createPropertyStep,
  createSummaryStep,
} from "../../../fragments/forms/wizardStepFactory";
import { SummaryNotice, SummaryPanel } from "../../../fragments/forms/summaryPanel";
import { Wizard } from "../../../fragments/wizard/wizard";
import type { WizardStep } from "../../../fragments/wizard/types/wizardStep";
import { addMonthsToDate, isDateWithinTwoMonths } from "../../../utilities/dateUtilities";
import { generateDocument } from "../../../utilities/documents/generateDocument";
import { buildSupportsText } from "../../../utilities/textUtilities";
import { areFieldsFilled, hasFilledItems } from "../../../utilities/validationUtilities";
import { NO_REGISTRA, SUGGESTION_FORMS } from "../const/const";
import { TermsCalculator } from "./components/termsCalculator";
import { useReconsiderationContext } from "./context/reconsiderationContext";

export const ReconsiderationForm = () => {
  const { state, dispatch } = useReconsiderationContext();
  const { fechaExpedicion, actuacionPrevia, solicitante, hechos, anexos } = state;
  const navigate = useNavigate();

  const isExpeditionDateValid = isDateWithinTwoMonths(fechaExpedicion);
  const isActuacionComplete = actuacionPrevia.trim().length > 0;
  const isSolicitanteComplete = areFieldsFilled(solicitante, [
    "tratamiento",
    "actuaComo",
    "nombre",
    "cedula",
    "direccion",
    "celular",
    "correo",
  ]);
  const isInmuebleComplete = areFieldsFilled(solicitante, ["identificador", "numeroIdentificacion"]);
  const isHechosComplete = hasFilledItems(hechos);

  const supports = buildSupportsText([
    { count: hechos.length, singular: "hecho", plural: "hechos" },
    { count: anexos.length, singular: "anexo", plural: "anexos" },
  ]);
  const calidad = solicitante.actuaComo ? "propietario" : "otro / no propietario";
  const identificadorTexto = isSolicitanteComplete ? solicitante.identificador : NO_REGISTRA;
  const numeroIdentificacionTexto = isSolicitanteComplete ? solicitante.numeroIdentificacion : NO_REGISTRA;
  const fechaLimite = addMonthsToDate(fechaExpedicion, 2);

  const steps: WizardStep[] = [
    {
      key: "calculadoraTerminos",
      title: "Calculadora de terminos",
      helper: "Primero, revisemos que estemos en tiempos de presentar el recurso",
      canContinue: isExpeditionDateValid,
      content: (
        <TermsCalculator
          value={fechaExpedicion}
          onChange={(value) => dispatch({ type: "SET_FECHA_EXPEDICION", payload: value })}
        />
      ),
    },
    createPreviousActStep({
      value: actuacionPrevia,
      onChange: (value) => dispatch({ type: "SET_ACTUACION_PREVIA", payload: value }),
      suggestionForm: SUGGESTION_FORMS.revision,
      canContinue: isActuacionComplete,
    }),
    createClaimantStep({
      value: solicitante,
      onChangeField: (field, value) => dispatch({ type: "SET_SOLICITANTE_FIELD", payload: { field, value } }),
      canContinue: isSolicitanteComplete,
      showRole: true,
      direccionLabel: "Direccion",
    }),
    createPropertyStep({
      value: solicitante,
      onChangeField: (field, value) => dispatch({ type: "SET_SOLICITANTE_FIELD", payload: { field, value } }),
      canContinue: isInmuebleComplete,
      identifierLabel: "Identificador del predio",
      numberLabel: "Numero Identificador",
    }),
    createFactsStep({
      items: hechos,
      suggestionForm: SUGGESTION_FORMS.reconsideration,
      canContinue: isHechosComplete,
      onAdd: (initialValue) => dispatch({ type: "ADD_HECHO_WITH_VALUE", payload: initialValue }),
      onUpdate: (id, value) => dispatch({ type: "UPDATE_HECHO", payload: { id, value } }),
      onRemove: (id) => dispatch({ type: "REMOVE_HECHO", payload: id }),
      onReorder: (activeId, overId) => dispatch({ type: "REORDER_HECHOS", payload: { activeId, overId } }),
    }),
    createAttachmentsStep({
      attachmentNames: anexos,
      onAttachmentsChange: (attachmentNames) => dispatch({ type: "SET_ANEXOS", payload: attachmentNames }),
      suggestionForm: SUGGESTION_FORMS.reconsideration,
      helper:
        "(Opcional recomendado) Aqui se anexaran los documentos que soportan la solicitud de reconsideración, si aplican.",
    }),
    createSummaryStep({
      canContinue: isActuacionComplete && isSolicitanteComplete && isHechosComplete,
      onNext: () => generateDocument("reconsideracion", state),
      content: (
        <div className="space-y-4">
          <SummaryPanel>
            {isActuacionComplete ? `Dada la actuación previa ${actuacionPrevia}, ` : ""}
            <strong>{isSolicitanteComplete ? solicitante.nombre : "N/N"}</strong>
            {` en calidad de ${calidad} del inmueble registrado con `}
            <strong>{identificadorTexto}</strong>
            {` ${numeroIdentificacionTexto} presenta el recurso de reconsideración${supports}`}
          </SummaryPanel>
          <SummaryNotice icon="schedule">
            Recuerda: tienes hasta el <strong>{fechaLimite || "dd/mm/yyyy"}</strong> para presentar el recurso.
          </SummaryNotice>
        </div>
      ),
    }),
    createNextStepsStep(
      <div className="space-y-4">
        <h4 className="font-semibold text-base-content">Terminos de respuesta</h4>
        <Note variant="warning">
          Generar el documento no lo radica automaticamente, este es un paso que debes hacer con tu secretaria de
          hacienda de manera presencial o mediante su correo electronico (Lo encontraras en el documento).
        </Note>
        <Note variant="info">
          A partir de la presentación del recurso la administración municipal tiene hasta un (1) año para responder a
          tu recurso.
        </Note>
        <Note variant="info">
          Si no responde, se entiende que hay "Silencio administrativo positivo". Esto quiere decir que si no hay
          respuesta deben acceder a tus peticiones en los terminos en los que lo propones.
        </Note>
      </div>,
    ),
  ];

  return (
    <Wizard
      icon="autorenew"
      title="RECURSO DE RECONSIDERACIÓN"
      steps={steps}
      onFinish={() => navigate("/tools")}
    />
  );
};
