type ResumeProps = {
  actuaComo: boolean;
  solicitanteNombre: string;
  identificador: string;
  numeroIdentificacion: string;
  direccionPredio: string;
  isSolicitanteComplete: boolean;
  isPredioComplete: boolean;
};

// TODO: Mejorar el Look & Feel de esta pagina
export const Resume = ({
  actuaComo,
  solicitanteNombre,
  identificador,
  numeroIdentificacion,
  direccionPredio,
  isSolicitanteComplete,
  isPredioComplete,
}: ResumeProps) => {
  return (
    <div className="space-y-4">
      <div className="surface-panel bg-base-200/30 p-4">
        <ul className="mt-3 space-y-2 text-sm text-base-content/80">
          <li>
            <b>Actua como:</b> {actuaComo ? "Propietario" : "Otro / No propietario"}
          </li>
          <li>
            <b>Quien solicita:</b> {isSolicitanteComplete ? solicitanteNombre : "Pendientes"}
          </li>
          <li>
            <b>{isPredioComplete && identificador ? identificador : "Identificador"}:</b>{" "}
            {isPredioComplete && numeroIdentificacion ? numeroIdentificacion : "Pendiente"}
          </li>
          <li>
            <b>Direccion del predio:</b> {isPredioComplete && direccionPredio ? direccionPredio : "Pendiente"}
          </li>
        </ul>
      </div>
    </div>
  );
};
