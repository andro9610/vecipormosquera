type ResumeProps = {
  actuacionPrevia: string;
  actuaComo: boolean;
  solicitanteNombre: string;
  identificador: string;
  numeroIdentificacion: string;
  hechosCount: number;
  anexosCount: number;
  isActuacionComplete: boolean;
  isSolicitanteComplete: boolean;
};

export const Resume = ({
  actuacionPrevia,
  actuaComo,
  solicitanteNombre,
  identificador,
  numeroIdentificacion,
  hechosCount,
  anexosCount,
  isActuacionComplete,
  isSolicitanteComplete,
}: ResumeProps) => {
  return (
    <div className="space-y-4">
      <div className="surface-panel bg-base-200/30 p-4">
        <ul className="mt-3 space-y-2 text-sm text-base-content/80">
          <li>
            <b>Actuacion previa:</b> {isActuacionComplete ? actuacionPrevia : "No registra"}
          </li>
          <li>
            <b>Actua como:</b> {actuaComo ? "Propietario" : "Otro / No propietario"}
          </li>
          <li>
            <b>Quien solicita:</b> {isSolicitanteComplete ? solicitanteNombre : "pendientes"}
          </li>
          <li>
            <b>{isSolicitanteComplete ? identificador : "pendiente"}:</b>{" "}
            {isSolicitanteComplete ? numeroIdentificacion : "pendiente"}
          </li>
          <li>
            <b>Hechos:</b> {hechosCount}
          </li>
          <li>
            <b>Anexos:</b> {anexosCount}
          </li>
        </ul>
      </div>
    </div>
  );
};
