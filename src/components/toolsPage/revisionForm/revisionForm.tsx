import { useNavigate } from "react-router-dom";
import { useRequirementContext } from "./context/requirementsContext";
import { useDocumentTools } from "../../../hooks/generateDocument";
import { Wizard, type WizardStep } from "../../../fragments/wizard/wizard";
import { PreviousAct } from "./components/previousAct";
import { ClaimantInfo } from "./components/claimantInfo";
import { Facts } from "./components/facts";
import { Requirements } from "./components/requirements";
import { Attachments } from "./components/attachments/attachments";
import { MunicipioInfo } from "./components/municipioInfo";
import { NextSteps } from "./components/nextSteps";
import { Resume } from "./components/resume";

type RevisionFormProps = {
  isBackdoor?: boolean;
};

export const RevisionForm = ({ isBackdoor = false }: RevisionFormProps) => {
  const showMunicipioStep = isBackdoor;
  const { state, dispatch } = useRequirementContext();
  const { actuacionPrevia, solicitante, peticiones, hechos, anexos, municipio } = state;
  const { generateDocument } = useDocumentTools();
  const navigate = useNavigate();

  const hasFilledItems = (items: Array<{ value: string }>) => items.some((item) => item.value.trim().length > 0);
  const isActuacionComplete = actuacionPrevia.trim().length > 0;
  const isSolicitanteComplete = [
    solicitante.tratamiento,
    solicitante.nombre,
    solicitante.cedula,
    solicitante.direccion,
    solicitante.celular,
    solicitante.correo,
  ].every((field) => String(field).trim().length > 0);
  const isPeticionesComplete = hasFilledItems(peticiones);
  const isHechosComplete = hasFilledItems(hechos);
  const isMunicipioComplete = [
    municipio.departamento,
    municipio.municipio,
    municipio.gestorCatastral,
    municipio.correoGestorCatastral,
  ].every((field) => String(field).trim().length > 0);

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
          onChangeField={(field, value) =>
            dispatch({
              type: "SET_MUNICIPIO_FIELD",
              payload: { field, value },
            })
          }
        />
      ),
    });
  }

  steps.push(
    {
      key: "actuacion",
      title: "Actuacion previa",
      helper: "Aqui puede indicar cual es la actuacion o documento que motiva la solicitud",
      canContinue: true,
      content: (
        <PreviousAct
          value={actuacionPrevia}
          onChange={(value) => dispatch({ type: "SET_ACTUACION_PREVIA", payload: value })}
        />
      ),
    },
    {
      key: "solicitante",
      title: "Informacion del solicitante",
      helper:
        "En las siguientes direcciones se notificara, comunicara o enviara la respuesta, se recomienda escribir bien las direcciones y asegurarse que sea una direccion reciente o que se revise frecuentemente.",
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
      key: "hechos",
      title: "Hechos",
      helper:
        "Escribir los hechos en orden cronologico, del mas antiguo al mas reciente, y de manera clara para que cada uno sea entendible.",
      canContinue: isHechosComplete,
      content: (
        <Facts
          facts={hechos}
          onAdd={(initialValue?: string) => dispatch({ type: "ADD_HECHO_WITH_VALUE", payload: initialValue })}
          onUpdate={(id, value) => dispatch({ type: "UPDATE_HECHO", payload: { id, value } })}
          onRemove={(id) => dispatch({ type: "REMOVE_HECHO", payload: id })}
          onReorder={(activeId, overId) =>
            dispatch({
              type: "REORDER_HECHOS",
              payload: { activeId, overId },
            })
          }
        />
      ),
    },
    {
      key: "peticiones",
      title: "Peticiones",
      helper:
        "Escribir las peticiones o preguntas de la manera mas clara posible, utilizando al inicio frases como se me informe, se me indique, o se me senale.",
      canContinue: isPeticionesComplete,
      content: (
        <Requirements
          requirements={peticiones}
          onAdd={() => dispatch({ type: "ADD_PETICION" })}
          onUpdate={(id, value) => dispatch({ type: "UPDATE_PETICION", payload: { id, value } })}
          onRemove={(id) => dispatch({ type: "REMOVE_PETICION", payload: id })}
          onReorder={(activeId, overId) =>
            dispatch({
              type: "REORDER_PETICIONES",
              payload: { activeId, overId },
            })
          }
        />
      ),
    },
    {
      key: "anexos",
      title: "Anexos",
      helper: "(Opcional recomendado) Aqui se anexaran los documentos que soportan la solicitud de revision, si aplican.",
      canContinue: true,
      content: (
        <Attachments
          attachmentNames={anexos}
          onAttachmentsChange={(attachmentNames) =>
            dispatch({
              type: "SET_ANEXOS",
              payload: attachmentNames,
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
      onNext: () => generateDocument("revision", state, { skipCounter: isBackdoor }),
      canContinue:
        isSolicitanteComplete &&
        isPeticionesComplete &&
        isHechosComplete &&
        (!showMunicipioStep || isMunicipioComplete),
      content: (
        <Resume
          actuacionPrevia={actuacionPrevia}
          solicitanteNombre={solicitante.nombre}
          hechosCount={hechos.length}
          peticionesCount={peticiones.length}
          anexosCount={anexos.length}
          isActuacionComplete={isActuacionComplete}
          isSolicitanteComplete={isSolicitanteComplete}
          showMunicipio={showMunicipioStep}
          municipio={municipio}
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
