import { useReconsiderationContext } from "./context/reconsiderationContext";
import { useDocumentTools } from "../../../hooks/generateDocument";
import { Wizard, type WizardStep } from "../../../fragments/wizard/wizard";
import { Attachements } from "./components/attachments";
import { ClaimantInfo } from "./components/claimantInfo";
import { Facts } from "./components/facts";
import { PreviousAct } from "./components/previousAct";
import { Resume } from "./components/resume";
import { PropertyInfo } from "./components/propertyInfo";

export const ReconsiderationForm = () => {
  const { state, dispatch } = useReconsiderationContext();
  const { actuacionPrevia, solicitante, hechos, anexos } = state;
  const { generateDocument } = useDocumentTools();

  const hasFilledItems = (items: Array<{ value: string }>) => items.some((item) => item.value.trim().length > 0);
  const isActuacionComplete = actuacionPrevia.trim().length > 0;
  const isSolicitanteComplete = [
    solicitante.tratamiento,
    solicitante.actuaComo,
    solicitante.nombre,
    solicitante.cedula,
    solicitante.direccion,
    solicitante.celular,
    solicitante.correo,
  ].every((field) => String(field).trim().length > 0);
  const isInmuebleComplete = [solicitante.identificador, solicitante.numeroIdentificacion].every(
    (field) => String(field).trim().length > 0,
  );
  const isHechosComplete = hasFilledItems(hechos);

  const steps: WizardStep[] = [
    {
      key: "actuacion",
      title: "Actuacion previa",
      helper: "Aqui puede indicar cual es la actuacion o documento que motiva la solicitud",
      canContinue: isActuacionComplete,
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
      key: "inmueble",
      title: "Informacion del inmueble",
      helper:
        "Indique el tipo de identificador del inmueble, el numero de identificacion y la direccion del inmueble. Esta informacion es importante para que la solicitud sea procesada correctamente.",
      canContinue: isInmuebleComplete,
      content: (
        <PropertyInfo
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
      key: "fundamentos",
      title: "Fundamentos de hecho y de derecho",
      helper:
        "Narrar los hechos de manera cronológica del más antiguo al más reciente, apoyándolos de argumentación jurídica de las razones por las que el impuesto está mal liquidado, está mal formulado o hay algún yerro y por ello, se requiere su modificación parcial o total. Para ello, se puede apoyar del normograma que va adjunto al paquete de minutas entregado junto a la presente. ",
      canContinue: isHechosComplete,
      content: (
        <Facts
          facts={hechos}
          onAdd={() => dispatch({ type: "ADD_HECHO" })}
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
      key: "anexos",
      title: "Anexos",
      helper: "Aqui se anexaran los documentos que soportan la solicitud de reconsideración, si aplican.",
      canContinue: true,
      content: (
        <Attachements
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
      canContinue: isActuacionComplete && isSolicitanteComplete && isHechosComplete,
      content: (
        <Resume
          actuacionPrevia={actuacionPrevia}
          actuaComo={solicitante.actuaComo}
          solicitanteNombre={solicitante.nombre}
          identificador={solicitante.identificador}
          numeroIdentificacion={solicitante.numeroIdentificacion}
          hechosCount={hechos.length}
          anexosCount={anexos.length}
          isActuacionComplete={isActuacionComplete}
          isSolicitanteComplete={isSolicitanteComplete}
        />
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <Wizard
        title="SOLICITUD DE RECONSIDERACIÓN"
        steps={steps}
        finishLabel="Generar documento"
        onFinish={() => generateDocument("reconsideracion", state)}
      />
    </div>
  );
};
