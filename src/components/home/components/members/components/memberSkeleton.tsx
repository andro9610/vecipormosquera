type MemberSkeletonProps = {
    length: number;
}

export const MemberSkeleton: React.FC<MemberSkeletonProps> = ({ length }) => {
    return (
      <div className="surface-panel p-4 md:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="h-5 w-48 rounded bg-base-300 animate-pulse" />
          <div className="h-5 w-7 rounded bg-base-300 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: length }).map((_, index) => (
            <div
              key={index}
              className="relative h-44 overflow-hidden rounded-2xl border border-base-300/60 bg-base-300 animate-pulse sm:h-56"
            >
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="h-3 w-24 rounded bg-base-100/60" />
                <div className="mt-1.5 h-2.5 w-16 rounded bg-base-100/40" />
              </div>
              <span className="sr-only">Cargando miembro...</span>
            </div>
          ))}
        </div>
      </div>
    );
}
