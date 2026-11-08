import { useMemo } from "react";
import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { CourseCard } from "./components/courseCard";
import { CourseFeedback } from "./components/courseFeedback";
import { CourseListSkeleton } from "./components/courseListSkeleton";
import { SectionHeading } from "./components/sectionHeading";
import { useCourses } from "./hooks/useCourses";

export const Learn = () => {
  const { courses, isLoading, isError } = useCourses();

  const totals = useMemo(
    () =>
      courses.reduce(
        (accumulator, course) => ({
          modules: accumulator.modules + course.modules.length,
          lessons:
            accumulator.lessons +
            course.modules.reduce((sum, courseModule) => sum + courseModule.lessons.length, 0),
        }),
        { modules: 0, lessons: 0 }
      ),
    [courses]
  );

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6">
      <header
        className="surface-organic relative overflow-hidden p-5 md:p-7"
        aria-labelledby="learn-heading"
      >
        <MaterialIcon
          icon="play_lesson"
          className="pointer-events-none absolute -right-2 -top-2 text-[7rem] text-primary/10"
          fill={1}
        />
        <div className="relative max-w-3xl">
          <SectionHeading
            id="learn-heading"
            as="h1"
            title="Cursos y formación"
            icon="school"
            titleClassName="text-2xl md:text-4xl"
          />
          <p className="mt-3 text-sm text-base-content/80 md:text-base">
            Formación ciudadana para aprender a tu ritmo. Explora cursos organizados por módulos y
            clases en video sobre catastro, impuesto predial y participación ciudadana.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-base-100/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-base-content/70">
              <MaterialIcon icon="menu_book" className="text-base text-primary" />
              {courses.length} cursos
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-base-100/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-base-content/70">
              <MaterialIcon icon="view_module" className="text-base text-primary" />
              {totals.modules} módulos
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-base-100/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-base-content/70">
              <MaterialIcon icon="play_circle" className="text-base text-primary" />
              {totals.lessons} clases
            </span>
          </div>
        </div>
      </header>

      <section aria-labelledby="learn-catalog-heading" className="space-y-3">
        <SectionHeading
          id="learn-catalog-heading"
          title="Catálogo de cursos"
          icon="auto_stories"
          className="justify-between"
          trailing={<span className="badge badge-primary badge-sm">{courses.length}</span>}
        />

        {isLoading && <CourseListSkeleton length={6} />}

        {isError && (
          <CourseFeedback
            icon="error"
            tone="danger"
            title="No pudimos cargar los cursos"
            description="Ocurrió un problema al consultar el catálogo. Intenta nuevamente más tarde."
          />
        )}

        {!isLoading && !isError && courses.length === 0 && (
          <CourseFeedback
            icon="auto_stories"
            title="Aún no hay cursos publicados"
            description="Estamos preparando nuevo contenido para la comunidad. Vuelve pronto para descubrir los cursos disponibles."
          />
        )}

        {!isLoading && !isError && courses.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
};
