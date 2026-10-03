type ResumeProps = {
    actuacionPrevia: string;
    solicitanteNombre: string;
    hechosCount: number;
    peticionesCount: number;
    isActuacionComplete: boolean;
    isSolicitanteComplete: boolean;
};

const pluralize = (count: number, singular: string, plural: string) =>
    `${count} ${count === 1 ? singular : plural}`;

const buildSupportsText = (hechosCount: number, peticionesCount: number): string => {
    const supports: string[] = [];

    if (hechosCount > 0) supports.push(pluralize(hechosCount, "hecho", "hechos"));
    if (peticionesCount > 0) supports.push(pluralize(peticionesCount, "peticion", "peticiones"));

    return supports.length > 0 ? ` soportado en ${supports.join(" y ")}.` : ".";
};

export const Resume = ({
    actuacionPrevia,
    solicitanteNombre,
    hechosCount,
    peticionesCount,
    isActuacionComplete,
    isSolicitanteComplete,
}: ResumeProps) => {
    const encabezado = isActuacionComplete ? `Dada la actuación previa ${actuacionPrevia}, ` : "";
    const nombreSolicitante = isSolicitanteComplete ? solicitanteNombre : "N/N";
    const soportesTexto = buildSupportsText(hechosCount, peticionesCount);

    return (
        <div className="space-y-4">
            <div className="surface-panel bg-base-200/30 p-4">
                <p className="text-sm leading-relaxed text-base-content/80">
                    {encabezado}
                    <strong>{nombreSolicitante}</strong>
                    {` presenta solicitud de revisión${soportesTexto}`}
                </p>
            </div>
        </div>
    );
};
