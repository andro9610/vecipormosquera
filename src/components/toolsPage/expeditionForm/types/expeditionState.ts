import type { ClaimantInfo } from "./claimantInfo";

export type ExpeditionState = {
  solicitante: ClaimantInfo;
  predio: {
    identificador: string;
    numeroIdentificacion: string;
    direccion: string;
  };
};
