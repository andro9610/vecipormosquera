import { useExpeditionContext } from "./context/expeditionContext";
import { useDocumentTools } from "../../../hooks/generateDocument";
import { Wizard, type WizardStep } from "../../../fragments/wizard/wizard";
import { ClaimantInfo } from "./components/claimantInfo";
import { PropertyInfo } from "./components/propertyInfo";
import { Resume } from "./components/resume";

export const ExpeditionForm: React.FC = () => {
  const { state, dispatch } = useExpeditionContext();
  const { solicitante, predio } = state;
  const { generateDocument } = useDocumentTools();

  const isSolicitanteComplete = [
    solicitante.tratamiento,
    solicitante.nombre,
    solicitante.cedula,
    solicitante.direccion,
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
  ];

  return (
    <Wizard
      icon="receipt_long"
      title="SOLICITUD DE EXPEDICION DE IMPUESTO PREDIAL"
      steps={steps}
      finishLabel="Generar documento"
      onFinish={() => generateDocument("expedicion", state)}
    />
  );
};
