export type BufferLike = {
  type: string;
  data: number[];
}

/** Serializa el fotografía (Buffer del backend) en un Blob reutilizable en <img>. */
export const bufferToPhotoSrc = (photo: BufferLike | null): string | undefined => {
  if (!photo || !Array.isArray(photo.data) || photo.data.length === 0) return undefined;

  const bytes = new Uint8Array(photo.data);
  let mime = "image/png";
  if (typeof photo.type === "string" && photo.type.toLowerCase().startsWith("image/")) {
    mime = photo.type;
  }

  const blob = new Blob([bytes], { type: mime });
  return URL.createObjectURL(blob);
};