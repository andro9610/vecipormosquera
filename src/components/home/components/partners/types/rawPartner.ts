import type { BufferLike } from "../../../../../utilities/imageUtilities";

// TODO: Ajustar nombres de columnas al esquema real del backend (espejo de RawMember).
export type RawPartner = {
  ID: number;
  PARTNER_NAME: string;
  IS_ACTIVE: number;
  /** Logo de la organización. Puede venir como Buffer (como MEMBER PHOTO) o ser un path estático. */
  LOGO: BufferLike | null;
  WEBSITE_URL: string | null;
}
