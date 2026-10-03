import { useQuery } from "@tanstack/react-query";
import type { Member } from "../types/member";

type MemberSeed = {
  id: number;
  name: string;
  role: string;
  image: string;
  isActive: boolean;
};

const memberSeed: MemberSeed[] = [
  { id: 1, name: "Andres Tovar", role: "Tesorero", image: "andro.jpg", isActive: true },
  { id: 2, name: "Santiago Avila", role: "Vocal", image: "santiago.jpg", isActive: true },
  { id: 3, name: "Mauro Ruiz", role: "Presidente", image: "mauro.jpg", isActive: true },
  { id: 4, name: "Yohana Corredor", role: "Vocal", image: "yohana.jpg", isActive: true },
  { id: 5, name: "Manuel Nova", role: "Secretario", image: "manuel.png", isActive: true}
];

export const useMembers = () => {
  const { data: members, ...rest } = useQuery({
    queryKey: ["members"],
    queryFn: async (): Promise<Member[]> =>
      memberSeed.map((seed) => ({
        id: seed.id,
        name: seed.name,
        role: seed.role,
        isActive: seed.isActive,
        photoSrc: `${import.meta.env.BASE_URL}images/members/${seed.image}`,
        revokeSrc: () => {},
      })),
    staleTime: 60 * 1000,
  });

  return { members: members ?? [], ...rest };
};
