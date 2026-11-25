export const CourseDetailSkeleton = () => {
  return (
    <div className="learn-shell learn-shell--detail" aria-hidden="true">
      <div className="learn-app">
        <div className="learn-sidebar">
          <div className="h-6 w-full animate-pulse rounded bg-base-300/40" />
          <div className="h-6 w-2/3 animate-pulse rounded bg-base-300/40" />
          <div className="mx-auto mt-3 size-28 animate-pulse rounded-full bg-base-300/40" />
          <div className="mx-auto h-3 w-32 animate-pulse rounded-full bg-base-300/40" />
          <div className="h-3 w-28 animate-pulse rounded-full bg-base-300/40" />
          <div className="mt-2 space-y-2">
            <div className="h-12 w-full animate-pulse rounded-xl bg-base-300/40" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-base-300/40" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-base-300/40" />
          </div>
        </div>

        <div className="learn-main">
          <div className="h-4 w-44 animate-pulse rounded-full bg-base-300/40" />
          <div className="h-7 w-2/3 animate-pulse rounded bg-base-300/40" />
          <div className="learn-skeleton__media" />
          <div className="space-y-2">
            <div className="h-3 w-40 animate-pulse rounded-full bg-base-300/40" />
            <div className="h-3 w-full animate-pulse rounded-full bg-base-300/40" />
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-base-300/40" />
          </div>
        </div>
      </div>
      <span className="sr-only">Cargando curso...</span>
    </div>
  );
};
