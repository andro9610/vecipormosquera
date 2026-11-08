import revisionTemplateUrl from "../../docs/Solicitud_Revision.docx?url";
import reconsiderationTemplateUrl from "../../docs/Recurso_Reconsideracion.docx?url";
import expeditionTemplateUrl from "../../docs/Solicitud_Expedicion_Predial.docx?url";
import type {
  ClaimantInfo,
  ExpeditionState,
  ReconsiderationState,
  RequirementsState,
} from "../../types/toolsForms";
import { formatNumberedList } from "../numberedListUtilities";
import type { ReplacementMap } from "./templateUtilities";

export type DocumentKind = "revision" | "reconsideracion" | "expedicion";

export type TemplateGeneration = {
  templateUrl: string;
  filePrefix: string;
  replacementMaps: ReplacementMap[];
};

export type DocumentDataMap = {
  revision: RequirementsState;
  reconsideracion: ReconsiderationState;
  expedicion: ExpeditionState;
};

const isMale = (tratamiento?: string) => tratamiento?.trim() === "Sr";

const genderVerb = (tratamiento?: string) => (isMale(tratamiento) ? "o" : "a");

const roleLabel = (actuaComo: boolean, tratamiento?: string) => {
  if (actuaComo) return isMale(tratamiento) ? "Propietario" : "Propietaria";
  return isMale(tratamiento) ? "Poseedor" : "Poseedora";
};

const previousActReference = (value?: string) => (value?.trim() ? `Referencia. ${value.trim()}` : "");

const attachmentsList = (anexos: string[]) => formatNumberedList(anexos.map((value) => ({ value })));

const claimantReplacements = (solicitante: ClaimantInfo): ReplacementMap =>
  new Map<string, string>([
    ["Nombre_Solicitante", solicitante.nombre?.trim() ?? ""],
    ["Genero_Verbo", genderVerb(solicitante.tratamiento)],
    ["Cedula_Solicitante", solicitante.cedula?.trim() ?? ""],
    ["Direccion_Solicitante", solicitante.direccion?.trim() ?? ""],
    ["Celular_Solicitante", solicitante.celular?.trim() ?? ""],
    ["Correo_Solicitante", solicitante.correo?.trim() ?? ""],
  ]);

const revisionStrategy = (data: RequirementsState): TemplateGeneration => ({
  templateUrl: revisionTemplateUrl,
  filePrefix: "Solicitud_Revision",
  replacementMaps: [
    claimantReplacements(data.solicitante),
    new Map<string, string>([
      ["Actuacion_Previa", previousActReference(data.actuacionPrevia)],
      ["Hechos_Solicitud", formatNumberedList(data.hechos)],
      ["Peticiones_Solicitud", formatNumberedList(data.peticiones)],
      ["Departamento_", data.municipio.departamento?.trim() ?? ""],
      ["Municipio_", data.municipio.municipio?.trim() ?? ""],
      ["Correo_Gestor_Catastral_", data.municipio.correoGestorCatastral?.trim() ?? ""],
      ["Gestor_Catastral_", data.municipio.gestorCatastral?.trim() ?? ""],
      ["Anexos_Solicitud_", attachmentsList(data.anexos)],
    ]),
  ],
});

const reconsiderationStrategy = (data: ReconsiderationState): TemplateGeneration => ({
  templateUrl: reconsiderationTemplateUrl,
  filePrefix: "Recurso_Reconsideracion",
  replacementMaps: [
    claimantReplacements(data.solicitante),
    new Map<string, string>([
      ["Actuacion_Previa", previousActReference(data.actuacionPrevia)],
      ["Actua_Como", roleLabel(data.solicitante.actuaComo, data.solicitante.tratamiento)],
      ["Identificador_Inmueble", data.solicitante.identificador?.trim() ?? ""],
      ["Numero_Identificacion_Inmueble", data.solicitante.numeroIdentificacion?.trim() ?? ""],
      ["Fundamentos_Hecho_Derecho", formatNumberedList(data.hechos)],
      ["Anexos_Solicitud", attachmentsList(data.anexos)],
    ]),
  ],
});

const expeditionStrategy = (data: ExpeditionState): TemplateGeneration => ({
  templateUrl: expeditionTemplateUrl,
  filePrefix: "Solicitud_Expedicion_Predial",
  replacementMaps: [
    claimantReplacements(data.solicitante),
    new Map<string, string>([
      ["Actua_Como", roleLabel(data.solicitante.actuaComo, data.solicitante.tratamiento)],
      ["Identificador_Inmueble", data.predio.identificador?.trim() ?? ""],
      ["Numero_Identificacion_Inmueble", data.predio.numeroIdentificacion?.trim() ?? ""],
      ["Direccion_Predio", data.predio.direccion?.trim() ?? ""],
      [
        "Adicion_Catastral",
        data.predio.numeroIdentificacion.trim().length > 0
          ? `y ${data.predio.identificador.trim()} ${data.predio.numeroIdentificacion.trim()}`
          : "",
      ],
    ]),
  ],
});

export const documentStrategies = {
  revision: revisionStrategy,
  reconsideracion: reconsiderationStrategy,
  expedicion: expeditionStrategy,
} satisfies { [K in DocumentKind]: (data: DocumentDataMap[K]) => TemplateGeneration };
