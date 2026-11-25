type CourseListSkeletonProps = {
  length: number;
};

export const CourseListSkeleton = ({ length }: CourseListSkeletonProps) => {
  return (
    <div className="learn-grid" aria-hidden="true">
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="learn-card">
          <div className="learn-skeleton__media" />
          <div className="learn-skeleton__body">
            <div className="learn-skeleton__line w-3/4" />
            <div className="learn-skeleton__line learn-skeleton__line--sm w-full" />
            <div className="learn-skeleton__line learn-skeleton__line--sm w-2/3" />
            <div className="learn-skeleton__pill" />
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando cursos...</span>
    </div>
  );
};
