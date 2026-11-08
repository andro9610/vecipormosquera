type CourseListSkeletonProps = {
  length: number;
};

export const CourseListSkeleton = ({ length }: CourseListSkeletonProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="surface-panel overflow-hidden">
          <div className="aspect-video animate-pulse bg-base-300" />
          <div className="space-y-3 p-4 md:p-5">
            <div className="h-5 w-3/4 animate-pulse rounded bg-base-300" />
            <div className="h-3 w-full animate-pulse rounded bg-base-300" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-base-300" />
            <div className="h-10 w-full animate-pulse rounded bg-base-300" />
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando cursos...</span>
    </div>
  );
};
