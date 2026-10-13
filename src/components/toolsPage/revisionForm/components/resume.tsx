import type { MunicipioInfo as MunicipioInfoType } from "../types/municipioInfo";

type ResumeProps = {
    actuacionPrevia: string;
    solicitanteNombre: string;
    hechosCount: number;
    peticionesCount: number;
    anexosCount: number;
    isActuacionComplete: boolean;
    isSolicitanteComplete: boolean;
    showMunicipio: boolean;
    municipio: MunicipioInfoType;
};

const pluralize = (count: number, singular: string, plural: string) =>
    `${count} ${count === 1 ? singular : plural}`;

const buildSupportsText = (hechosCount: number, peticionesCount: number, anexosCount: number): string => {
    const supports: string[] = [];

    if (hechosCount > 0) supports.push(pluralize(hechosCount, "hecho", "hechos"));
    if (peticionesCount > 0) supports.push(pluralize(peticionesCount, "peticion", "peticiones"));
    if (anexosCount > 0) supports.push(pluralize(anexosCount, "anexo", "anexos"));

    return supports.length > 0 ? ` soportado en ${supports.join(" y ")}.` : ".";
};

export const Resume = ({
    actuacionPrevia,
    solicitanteNombre,
    hechosCount,
    peticionesCount,
    anexosCount,
    isActuacionComplete,
    isSolicitanteComplete,
    showMunicipio,
    municipio,
}: ResumeProps) => {
    const encabezado = isActuacionComplete ? `Dada la actuación previa ${actuacionPrevia}, ` : "";
    const nombreSolicitante = isSolicitanteComplete ? solicitanteNombre : "N/N";
    const soportesTexto = buildSupportsText(hechosCount, peticionesCount, anexosCount);
    const hasMunicipioData = showMunicipio && (municipio.departamento.trim().length > 0 || municipio.municipio.trim().length > 0);

    return (
        <div className="space-y-4">
            <div className="surface-panel bg-base-200/30 p-4">
                <p className="text-sm leading-relaxed text-base-content/80">
                    {encabezado}
                    <strong>{nombreSolicitante}</strong>
                    {` presenta solicitud de revisión${soportesTexto}`}
                </p>
            </div>
            {hasMunicipioData && (
                <div className="surface-panel bg-base-200/30 p-4">
                    <h5 className="mb-2 font-semibold text-base-content">DATOS DEL MUNICIPIO</h5>
                    <ul className="space-y-1 text-sm text-base-content/80">
                        <li>Departamento: {municipio.departamento || "N/N"}</li>
                        <li>Municipio: {municipio.municipio || "N/N"}</li>
                        <li>Gestor catastral: {municipio.gestorCatastral || "N/N"}</li>
                        <li>Correo del gestor catastral: {municipio.correoGestorCatastral || "N/N"}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};
