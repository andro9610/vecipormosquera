type ResumeProps = {
  actuaComo: boolean;
  solicitanteNombre: string;
  identificador: string;
  numeroIdentificacion: string;
  direccionPredio: string;
  isSolicitanteComplete: boolean;
  isPredioComplete: boolean;
};

const NO_REGISTRA = "(No registra)";

export const Resume = ({
  actuaComo,
  solicitanteNombre,
  identificador,
  numeroIdentificacion,
  direccionPredio,
  isSolicitanteComplete,
  isPredioComplete,
}: ResumeProps) => {
  const nombreSolicitante = isSolicitanteComplete ? solicitanteNombre : "N/N";
  const calidad = actuaComo ? "propietario" : "otro / no propietario";
  const identificadorTexto = isPredioComplete && identificador ? identificador : NO_REGISTRA;
  const numeroIdentificacionTexto =
    isPredioComplete && numeroIdentificacion ? numeroIdentificacion : NO_REGISTRA;
  const direccionTexto = isPredioComplete && direccionPredio ? direccionPredio : NO_REGISTRA;

  return (
    <div className="space-y-4">
      <div className="surface-panel bg-base-200/30 p-4">
        <p className="text-sm leading-relaxed text-base-content/80">
          <strong>{nombreSolicitante}</strong>
          {` en calidad de ${calidad} del inmueble registrado con `}
          <strong>{identificadorTexto}</strong>
          {` ${numeroIdentificacionTexto} ubicado en ${direccionTexto} presenta su solicitud de expedición de impuesto predial.`}
        </p>
      </div>
    </div>
  );
};
