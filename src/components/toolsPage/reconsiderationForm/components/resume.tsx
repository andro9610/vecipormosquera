import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import { useDateTools } from "../../../../hooks/useDateTools";

type ResumeProps = {
  actuacionPrevia: string;
  actuaComo: boolean;
  solicitanteNombre: string;
  identificador: string;
  numeroIdentificacion: string;
  hechosCount: number;
  anexosCount: number;
  fechaExpedicion: string;
  isActuacionComplete: boolean;
  isSolicitanteComplete: boolean;
};

const NO_REGISTRA = "(No registra)";

const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

/**
 * Une los soportes del recurso en una lista natural ("2 hechos y 1 anexo") y
 * evita dejar la frase abierta ("soportado en .") cuando aun no hay datos.
 */
const buildSupportsText = (hechosCount: number, anexosCount: number): string => {
  const supports: string[] = [];

  if (hechosCount > 0) supports.push(pluralize(hechosCount, "hecho", "hechos"));
  if (anexosCount > 0) supports.push(pluralize(anexosCount, "anexo", "anexos"));

  return supports.length > 0 ? ` soportado en ${supports.join(" y ")}.` : ".";
};

export const Resume = ({
  actuacionPrevia,
  actuaComo,
  solicitanteNombre,
  identificador,
  numeroIdentificacion,
  hechosCount,
  anexosCount,
  fechaExpedicion,
  isActuacionComplete,
  isSolicitanteComplete,
}: ResumeProps) => {
  const { addMonthsToDate } = useDateTools();
  const fechaLimite = addMonthsToDate(fechaExpedicion, 2);

  const encabezado = isActuacionComplete ? `Dada la actuación previa ${actuacionPrevia}, ` : "";
  const nombreSolicitante = isSolicitanteComplete ? solicitanteNombre : "N/N";
  const calidad = actuaComo ? "propietario" : "otro / no propietario";
  const identificadorTexto = isSolicitanteComplete ? identificador : NO_REGISTRA;
  const numeroIdentificacionTexto = isSolicitanteComplete ? numeroIdentificacion : NO_REGISTRA;
  const soportesTexto = buildSupportsText(hechosCount, anexosCount);

  return (
    <div className="space-y-4">
      <div className="surface-panel bg-base-200/30 p-4">
        <p className="text-sm leading-relaxed text-base-content/80">
          {encabezado}
          <strong>{nombreSolicitante}</strong>
          {` en calidad de ${calidad} del inmueble registrado con `}
          <strong>{identificadorTexto}</strong>
          {` ${numeroIdentificacionTexto} presenta el recurso de reconsideración${soportesTexto}`}
        </p>
      </div>

      <div
        role="note"
        className="surface-danger flex items-start gap-2 rounded-xl p-3 text-sm font-medium"
      >
        <MaterialIcon icon="schedule" className="mt-0.5 shrink-0" />
        <p className="m-0">
          Recuerda: tienes hasta el <strong>{fechaLimite || "dd/mm/yyyy"}</strong> para presentar el recurso.
        </p>
      </div>
    </div>
  );
};

