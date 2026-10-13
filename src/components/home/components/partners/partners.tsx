import { usePartners } from "./hooks/usePartners";
import { PartnerSkeleton } from "./components/partnerSkeleton";
import { PartnerError } from "./components/partnerError";
import { PartnerRef } from "./components/partnerRef";

export const Partners: React.FC = () => {
  const { partners, isLoading, isError } = usePartners();

  if (isLoading) return <PartnerSkeleton length={4} />;
  if (isError) return <PartnerError />;

  return (
    <section className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-start">
      <span className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
        Organizaciones aliadas
      </span>
      {partners.map((partner) => (
        <PartnerRef key={partner.id} partner={partner} />
      ))}
    </section>
  );
};
