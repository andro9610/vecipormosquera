import { ErrorMessage } from "../../../../fragments/status/errorMessage";
import { PartnerRef } from "./components/partnerRef";
import { PartnerSkeleton } from "./components/partnerSkeleton";
import { usePartners } from "./hooks/usePartners";

export const Partners: React.FC = () => {
  const { partners, isLoading, isError } = usePartners();

  if (isLoading) return <PartnerSkeleton length={4} />;
  if (isError) return <ErrorMessage message="No se pudieron cargar las organizaciones aliadas. Inténtalo de nuevo más tarde." />;

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
