type ResumeProps = {
    actuacionPrevia: string;
    solicitanteNombre: string;
    hechosCount: number;
    peticionesCount: number;
    isActuacionComplete: boolean;
    isSolicitanteComplete: boolean;
};

export const Resume = ({
    actuacionPrevia,
    solicitanteNombre,
    hechosCount,
    peticionesCount,
    isActuacionComplete,
    isSolicitanteComplete,
}: ResumeProps) => {
    return (
        <div className="space-y-4">
            <div className="surface-panel bg-base-200/30 p-4">
                <ul className="mt-3 space-y-2 text-sm text-base-content/80">
                    <li><b>Actuacion previa:</b> {isActuacionComplete ? actuacionPrevia : 'No registra'}</li>
                    <li><b>Quien solicita:</b> {isSolicitanteComplete ? solicitanteNombre : 'pendientes'}</li>
                    <li><b>Hechos:</b> {hechosCount}</li>
                    <li><b>Peticiones:</b> {peticionesCount}</li>
                </ul>
            </div>
        </div>
    );
};
