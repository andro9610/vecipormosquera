export const CourseDetailSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6" aria-hidden="true">
      <div className="h-4 w-44 animate-pulse rounded bg-base-300" />
      <div className="surface-organic p-5 md:p-7">
        <div className="flex items-start gap-4">
          <div className="size-14 shrink-0 animate-pulse rounded-2xl bg-base-300" />
          <div className="w-full space-y-3">
            <div className="h-5 w-24 animate-pulse rounded bg-base-300" />
            <div className="h-8 w-2/3 animate-pulse rounded bg-base-300" />
            <div className="h-3 w-full animate-pulse rounded bg-base-300" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-base-300" />
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <div className="surface-panel overflow-hidden">
          <div className="aspect-video animate-pulse bg-base-300" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-32 animate-pulse rounded bg-base-300" />
            <div className="h-6 w-2/3 animate-pulse rounded bg-base-300" />
            <div className="h-3 w-full animate-pulse rounded bg-base-300" />
          </div>
        </div>
        <div className="surface-panel h-72 animate-pulse" />
      </div>
      <span className="sr-only">Cargando curso...</span>
    </div>
  );
};
