type PartnerSkeletonProps = {
  length: number;
}

export const PartnerSkeleton: React.FC<PartnerSkeletonProps> = ({ length }) => {
  return (
    <section className="w-full max-w-6xl mx-auto mt-8 px-4 flex justify-center">
      <div className="w-full flex flex-wrap items-center justify-center gap-x-10 gap-y-6" aria-hidden="true">
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-2 animate-pulse bg-base-200 rounded-lg px-3 py-2"
          >
            <div className="h-10 w-10 rounded bg-base-300" />
            <div className="h-4 w-28 rounded bg-base-300" />
          </div>
        ))}
        <span className="sr-only">Cargando organizaciones aliadas...</span>
      </div>
    </section>
  );
}
