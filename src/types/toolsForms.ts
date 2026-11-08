import type { SortableTextItem } from "./sortableTextItem";

export type ClaimantInfo = {
  tratamiento: string;
  nombre: string;
  cedula: string;
  direccion: string;
  celular: string;
  correo: string;
};

export type ClaimantWithRole = ClaimantInfo & {
  actuaComo: boolean;
};

export type PropertyIdentifier = {
  identificador: string;
  numeroIdentificacion: string;
};

export type PropertyInfo = PropertyIdentifier & {
  direccion: string;
};

export type MunicipioInfo = {
  departamento: string;
  municipio: string;
  gestorCatastral: string;
  correoGestorCatastral: string;
};

export type ReorderPayload = {
  activeId: string;
  overId: string;
};

export type TextItemPayload = {
  id: string;
  value: string;
};

export type RequirementsState = {
  actuacionPrevia: string;
  solicitante: ClaimantWithRole;
  municipio: MunicipioInfo;
  peticiones: SortableTextItem[];
  hechos: SortableTextItem[];
  anexos: string[];
};

export type RequirementsAction =
  | { type: "SET_ACTUACION_PREVIA"; payload: string }
  | { type: "SET_SOLICITANTE_FIELD"; payload: { field: keyof ClaimantWithRole; value: string | boolean } }
  | { type: "SET_MUNICIPIO_FIELD"; payload: { field: keyof MunicipioInfo; value: string } }
  | { type: "SET_ANEXOS"; payload: string[] }
  | { type: "ADD_PETICION" }
  | { type: "REMOVE_PETICION"; payload: string }
  | { type: "UPDATE_PETICION"; payload: TextItemPayload }
  | { type: "REORDER_PETICIONES"; payload: ReorderPayload }
  | { type: "ADD_HECHO_WITH_VALUE"; payload?: string }
  | { type: "REMOVE_HECHO"; payload: string }
  | { type: "UPDATE_HECHO"; payload: TextItemPayload }
  | { type: "REORDER_HECHOS"; payload: ReorderPayload };

export type ReconsiderationClaimant = ClaimantWithRole & PropertyIdentifier;

export type ReconsiderationState = {
  fechaExpedicion: string;
  actuacionPrevia: string;
  solicitante: ReconsiderationClaimant;
  hechos: SortableTextItem[];
  anexos: string[];
};

export type ReconsiderationAction =
  | { type: "SET_FECHA_EXPEDICION"; payload: string }
  | { type: "SET_ACTUACION_PREVIA"; payload: string }
  | { type: "SET_SOLICITANTE_FIELD"; payload: { field: keyof ReconsiderationClaimant; value: string | boolean } }
  | { type: "SET_ANEXOS"; payload: string[] }
  | { type: "ADD_HECHO_WITH_VALUE"; payload?: string }
  | { type: "REMOVE_HECHO"; payload: string }
  | { type: "UPDATE_HECHO"; payload: TextItemPayload }
  | { type: "REORDER_HECHOS"; payload: ReorderPayload };

export type ExpeditionState = {
  solicitante: ClaimantWithRole;
  predio: PropertyInfo;
};

export type ExpeditionAction =
  | { type: "SET_SOLICITANTE_FIELD"; payload: { field: keyof ClaimantWithRole; value: string | boolean } }
  | { type: "SET_PREDIO_FIELD"; payload: { field: keyof PropertyInfo; value: string } };

export type ToolsFormState = RequirementsState | ReconsiderationState | ExpeditionState;
