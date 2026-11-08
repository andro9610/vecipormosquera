import type { MunicipioInfo } from "../../../types/toolsForms";

export const SUGGESTION_FORMS = {
  revision: "SOLICITUD_REVISION",
  reconsideration: "RECURSO_RECONSIDERACION",
} as const;

export const DEFAULT_MUNICIPIO: MunicipioInfo = {
  departamento: "Cundinamarca",
  municipio: "Mosquera",
  gestorCatastral: "Instituto Geográfico Agustín Codazzi",
  correoGestorCatastral: "contactenos@igac.gov.co",
};

export const NO_REGISTRA = "(No registra)";
