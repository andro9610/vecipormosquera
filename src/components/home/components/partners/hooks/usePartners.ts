import { useQuery } from "@tanstack/react-query";
import type { Partner } from "../types/partner";

type PartnerSeed = {
  id: number;
  name: string;
  image: string;
  websiteUrl?: string;
  isActive: boolean;
};

const partnerSeed: PartnerSeed[] = [
  { id: 1, name: "Veeduria Manuela Beltran", image: "manuelaBeltran.webp", websiteUrl: "https://veeduriamanuelabeltran.org/", isActive: true },
];

export const usePartners = () => {
  const { data: partners, ...rest } = useQuery({
    queryKey: ["partners"],
    queryFn: async (): Promise<Partner[]> =>
      partnerSeed.map((seed) => ({
        id: seed.id,
        name: seed.name,
        isActive: seed.isActive,
        logoSrc: `${import.meta.env.BASE_URL}images/partners/${seed.image}`,
        websiteUrl: seed.websiteUrl || undefined,
        revokeSrc: () => {},
      })),
    staleTime: 60 * 1000,
  });

  return { partners: partners ?? [], ...rest };
};
