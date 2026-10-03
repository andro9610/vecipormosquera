import { usePartners } from "./hooks/usePartners";
import { PartnerSkeleton } from "./components/partnerSkeleton";
import { PartnerError } from "./components/partnerError";
import { PartnerRef } from "./components/partnerRef";

export const Partners: React.FC = () => {
  const { partners, isLoading, isError } = usePartners();

  if (isLoading) return <PartnerSkeleton length={4} />;
  if (isError) return <PartnerError />;

  return (
    <section className="w-full max-w-6xl mx-auto mt-8 px-4 flex justify-center">
      <div className="w-full flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {partners.map((partner) => (
          <PartnerRef key={partner.id} partner={partner} />
        ))}
      </div>
    </section>
  );
};

