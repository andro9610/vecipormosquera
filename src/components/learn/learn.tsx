import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { CourseCard } from "./components/courseCard";
import { CourseFeedback } from "./components/courseFeedback";
import { CourseListSkeleton } from "./components/courseListSkeleton";
import { useCourses } from "./hooks/useCourses";

export const Learn = () => {
  const { courses, isLoading, isError } = useCourses();

  const courseCount = courses.length;

  return (
    <div className="learn-shell">
      <header className="learn-hero" aria-labelledby="learn-heading">
        <MaterialIcon icon="auto_stories" fill={1} className="learn-hero__watermark" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h1 id="learn-heading" className="learn-title">
              Cursos y <span className="learn-title__mark">formación</span>
            </h1>
            <p className="learn-hero__lead">
              Formación ciudadana para aprender a tu ritmo. Explora cursos organizados por módulos y
              clases en video sobre catastro, impuesto predial y participación ciudadana.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 lg:pr-3">
            <div className="learn-ring" aria-hidden="true">
              <span className="learn-ring__orbit" />
              <span className="learn-ring__inner">
                <span className="learn-ring__value">
                  {String(courseCount).padStart(2, "0")}
                </span>
                <span className="learn-ring__label">Rutas</span>
              </span>
            </div>
            <span className="learn-stamp">A tu ritmo · sin costo</span>
          </div>
        </div>
      </header>

      <section aria-labelledby="learn-catalog-heading" className="space-y-6">
        <h2 id="learn-catalog-heading" className="learn-title learn-title--sm">
          Elige tu siguiente ruta
        </h2>

        {isLoading && <CourseListSkeleton length={6} />}

        {isError && (
          <CourseFeedback
            icon="error"
            tone="danger"
            title="No pudimos cargar los cursos"
            description="Ocurrió un problema al consultar el catálogo. Intenta nuevamente más tarde."
          />
        )}

        {!isLoading && !isError && courseCount === 0 && (
          <CourseFeedback
            icon="auto_stories"
            title="Aún no hay cursos publicados"
            description="Estamos preparando nuevo contenido para la comunidad. Vuelve pronto para descubrir los cursos disponibles."
          />
        )}

        {!isLoading && !isError && courseCount > 0 && (
          <div className="learn-grid">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
