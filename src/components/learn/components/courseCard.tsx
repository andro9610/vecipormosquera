import { Link } from "react-router-dom";
import { MaterialIcon } from "../../../fragments/materialIcon/MaterialIcon";
import type { Course } from "../types/course";
import { getCourseStats } from "../utilities/courseStats";

type CourseCardProps = {
  course: Course;
};

export const CourseCard = ({ course }: CourseCardProps) => {
  const { moduleCount, lessonCount, thumbnailUrl } = getCourseStats(course);

  return (
    <Link
      to={`/learn/${course.slug}`}
      className="surface-panel group flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
    >
      <div className="relative aspect-video overflow-hidden bg-base-300/50">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`Portada del curso ${course.title}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary via-accent to-neutral">
            <MaterialIcon icon={course.icon} className="text-5xl text-white/75" />
          </div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          <MaterialIcon icon="signal_cellular_alt" className="text-sm text-secondary" />
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-start gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MaterialIcon icon={course.icon} className="text-xl" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg leading-tight md:text-xl">{course.title}</h2>
            <p className="mt-2 text-sm text-base-content/80">{course.description}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-wide text-base-content/60">
          <span className="inline-flex items-center gap-1.5">
            <MaterialIcon icon="view_module" className="text-base text-primary" />
            {moduleCount} módulos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MaterialIcon icon="play_circle" className="text-base text-primary" />
            {lessonCount} clases
          </span>
        </div>

        <span className="btn btn-primary btn-sm justify-between gap-1 py-5">
          Ver curso
          <MaterialIcon icon="arrow_forward" className="text-base" />
        </span>
      </div>
    </Link>
  );
};
