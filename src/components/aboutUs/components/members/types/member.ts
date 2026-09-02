export type Member = {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
  photoSrc?: string;
  revokeSrc: () => void;
}