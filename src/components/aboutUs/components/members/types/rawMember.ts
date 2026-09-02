import type { BufferLike } from "../../../../../utilities/imageUtilities";

export type RawMember = {
  ID: number;
  MEMBER_NAME: string;
  MEMBER_ROLE: string;
  IS_ACTIVE: number;
  PHOTO: BufferLike | null;
}
