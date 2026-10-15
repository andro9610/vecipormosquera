import { useNavigate } from "react-router-dom";
import { useExpeditionContext } from "./context/expeditionContext";
import { useDocumentTools } from "../../../hooks/generateDocument";
import { Wizard, type WizardStep } from "../../../fragments/wizard/wizard";
import { ClaimantInfo } from "./components/claimantInfo";
import { NextSteps } from "./components/nextSteps";
import { PropertyInfo } from "./components/propertyInfo";
import { Resume } from "./components/resume";

export const ExpeditionForm: React.FC = () => {
  const { state, dispatch } = useExpeditionContext();
  const { solicitante, predio } = state;
  const { generateDocument } = useDocumentTools();
  const navigate = useNavigate();

  const isSolicitanteComplete = [
    solicitante.tratamiento,
    solicitante.nombre,
    solicitante.cedula,
    solicitante.celular,
    solicitante.correo,
  ].every((field) => String(field).trim().length > 0);

  const isDireccionPredioComplete = predio.direccion.trim().length > 0;
  const isPredioComplete = isDireccionPredioComplete;

    const steps: WizardStep[] = [
        {
            key: "claimantInfo",
            title: "Información del solicitante",
            helper: "",
      canContinue: isSolicitanteComplete,
            content: (
        <ClaimantInfo
          value={solicitante}
          onChangeField={(field, value) =>
            dispatch({
              type: "SET_SOLICITANTE_FIELD",
              payload: { field, value },
            })
          }
        />
      ),
        },
        {
      key: "wellInfo",
      title: "Información del predio",
      helper: "Diligencie cuantos datos tenga sobre el predio",
      canContinue: isPredioComplete,
            content: (
        <PropertyInfo
          value={predio}
          onChangeField={(field, value) =>
            dispatch({
              type: "SET_PREDIO_FIELD",
              payload: { field, value },
            })
          }
        />
      ),
    },
    {
      key: "resumen",
      title: "Resumen",
      helper: "Revise la informacion registrada antes de generar el documento final.",
      nextLabel: "Descargar documento y continuar",
      onNext: () => generateDocument("expedicion", state),
      canContinue: isSolicitanteComplete && isPredioComplete,
      content: (
        <Resume
          actuaComo={solicitante.actuaComo}
          solicitanteNombre={solicitante.nombre}
          identificador={predio.identificador}
          numeroIdentificacion={predio.numeroIdentificacion}
          direccionPredio={predio.direccion}
          isSolicitanteComplete={isSolicitanteComplete}
          isPredioComplete={isPredioComplete}
          />
      ),
    },
    {
      key: "siguientesPasos",
      title: "Siguientes pasos",
      helper: "",
      canContinue: true,
      content: <NextSteps />,
    },
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
