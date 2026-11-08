import { useNavigate } from "react-router-dom";
import { Note } from "../../../fragments/note/note";
import {
  createClaimantStep,
  createNextStepsStep,
  createPropertyStep,
  createSummaryStep,
} from "../../../fragments/forms/wizardStepFactory";
import { SummaryPanel } from "../../../fragments/forms/summaryPanel";
import { Wizard } from "../../../fragments/wizard/wizard";
import type { WizardStep } from "../../../fragments/wizard/types/wizardStep";
import { generateDocument } from "../../../utilities/documents/generateDocument";
import { areFieldsFilled, isFilled } from "../../../utilities/validationUtilities";
import { NO_REGISTRA } from "../const/const";
import { useExpeditionContext } from "./context/expeditionContext";

export const ExpeditionForm: React.FC = () => {
  const { state, dispatch } = useExpeditionContext();
  const { solicitante, predio } = state;
  const navigate = useNavigate();

  const isSolicitanteComplete = areFieldsFilled(solicitante, [
    "tratamiento",
    "nombre",
    "cedula",
    "celular",
    "correo",
  ]);
  const isPredioComplete = isFilled(predio.direccion);

  const calidad = solicitante.actuaComo ? "propietario" : "otro / no propietario";
  const identificadorTexto = isPredioComplete && predio.identificador ? predio.identificador : NO_REGISTRA;
  const numeroIdentificacionTexto =
    isPredioComplete && predio.numeroIdentificacion ? predio.numeroIdentificacion : NO_REGISTRA;
  const direccionTexto = isPredioComplete && predio.direccion ? predio.direccion : NO_REGISTRA;

  const steps: WizardStep[] = [
    createClaimantStep({
      value: solicitante,
      onChangeField: (field, value) => dispatch({ type: "SET_SOLICITANTE_FIELD", payload: { field, value } }),
      canContinue: isSolicitanteComplete,
      showRole: true,
      showDireccion: false,
      helper: "",
    }),
    createPropertyStep({
      value: predio,
      onChangeField: (field, value) => dispatch({ type: "SET_PREDIO_FIELD", payload: { field, value } }),
      canContinue: isPredioComplete,
      identifierLabel: "Tipo de identificacion del predio",
      numberLabel: "Numero de identificacion",
      showDireccion: true,
      title: "Información del predio",
      helper: "Diligencie cuantos datos tenga sobre el predio",
    }),
    createSummaryStep({
      canContinue: isSolicitanteComplete && isPredioComplete,
      onNext: () => generateDocument("expedicion", state),
      content: (
        <SummaryPanel>
          <strong>{isSolicitanteComplete ? solicitante.nombre : "N/N"}</strong>
          {` en calidad de ${calidad} del inmueble registrado con `}
          <strong>{identificadorTexto}</strong>
          {` ${numeroIdentificacionTexto} ubicado en ${direccionTexto} presenta su solicitud de expedición de impuesto predial.`}
        </SummaryPanel>
      ),
    }),
    createNextStepsStep(
      <Note variant="info">
        Guarda bien la radicación de la solicitud y respuesta del proceso, estas evidencias seran utiles para procesos
        futuros.
      </Note>,
    ),
  ];

  return (
    <Wizard
      icon="receipt_long"
      title="SOLICITUD DE EXPEDICION DE IMPUESTO PREDIAL"
      steps={steps}
      onFinish={() => navigate("/tools")}
    />
  );
};
