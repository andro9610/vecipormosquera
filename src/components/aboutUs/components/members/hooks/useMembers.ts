import { useQuery } from "@tanstack/react-query";
import { serviceUrl } from "../../../../../const/const";
import { bufferToPhotoSrc } from "../../../../../utilities/imageUtilities";
import type { RawMember } from "../types/rawMember";
import type { Member } from "../types/member";

export const useMembers = () => {

  const mapRawMember = (raw: RawMember): Member => {
    const photoSrc = bufferToPhotoSrc(raw.PHOTO);

    return {
      id: raw.ID,
      name: raw.MEMBER_NAME,
      role: raw.MEMBER_ROLE,
      isActive: raw.IS_ACTIVE === 1,
      photoSrc,
      revokeSrc: () => {
        if (photoSrc) URL.revokeObjectURL(photoSrc);
      },
    };
  };

  const { data: members, ...rest } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await fetch(`${serviceUrl}/members`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const raw = (await response.json()) as RawMember[];
      return raw.map((item) => mapRawMember(item));
    },
    staleTime: 60 * 1000,
  });

  return { members: members ?? [], ...rest };
};
