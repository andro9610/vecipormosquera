export type Partner = {
  id: number;
  name: string;
  isActive: boolean;
  /** URL resuelta del logo (blob del backend o asset estático) lista para <img>. */
  logoSrc?: string;
  /** Sitio web / enlace al que apunta el ref. */
  websiteUrl?: string;
  /** Libera el object URL del logo si fue generado desde un Buffer del backend. */
  revokeSrc: () => void;
}
