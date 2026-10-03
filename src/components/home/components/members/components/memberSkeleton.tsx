type MemberSkeletonProps = {
    length: number;
}

export const MemberSkeleton : React.FC<MemberSkeletonProps> = ({length}) => {
    return (
      <div className="relative w-full">
        <div className="rounded-2xl bg-base-100/50 shadow-lg shadow-base-300/20 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: length }).map((_, index) => (
              <article
                key={index}
                className="group relative h-100 md:h-100 overflow-hidden rounded-2xl bg-base-200 animate-pulse"
              >
                <div className="h-full w-full bg-base-300" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                  <div className="rounded-xl bg-black/25 px-3 py-2">
                    <div className="mx-auto h-3 w-28 rounded bg-base-300" />
                    <div className="mt-2 mx-auto h-2 w-16 rounded bg-base-300" />
                  </div>
                </div>
                <span className="sr-only">Cargando miembro...</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    );
}