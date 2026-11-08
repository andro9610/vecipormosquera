import { Link } from "react-router-dom";
import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import type { Course } from "../../types/course";
import { SectionHeading } from "../../components/sectionHeading";
import { getCourseStats } from "../../utilities/courseStats";
import { useCourseNavigation } from "../hooks/useCourseNavigation";
import { LessonPlayer } from "./lessonPlayer";
import { ModuleAccordion } from "./moduleAccordion";

type CourseContentProps = {
  course: Course;
};

export const CourseContent = ({ course }: CourseContentProps) => {
  const { moduleCount, lessonCount } = getCourseStats(course);
  const navigation = useCourseNavigation(course);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6">
      <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
        <Link to="/learn" className="inline-flex items-center gap-1 transition hover:text-primary">
          <MaterialIcon icon="arrow_back" className="text-base" />
          Cursos
        </Link>
        <MaterialIcon icon="chevron_right" className="text-sm" />
        <span className="font-medium text-base-content/80">{course.title}</span>
      </nav>

      <header className="surface-organic p-5 md:p-7" aria-labelledby="course-heading">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MaterialIcon icon={course.icon} className="text-3xl" />
            </span>
            <div>
              <SectionHeading
                id="course-heading"
                as="h1"
                title={course.title}
                titleClassName="text-2xl leading-tight md:text-4xl"
                trailing={<span className="badge badge-secondary badge-sm">{course.level}</span>}
              />
              <p className="mt-2 max-w-3xl text-sm text-base-content/80 md:text-base">
                {course.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <span className="surface-panel inline-flex items-center gap-2 px-3 py-2 text-sm font-medium">
              <MaterialIcon icon="view_module" className="text-base text-primary" />
              {moduleCount} módulos
            </span>
            <span className="surface-panel inline-flex items-center gap-2 px-3 py-2 text-sm font-medium">
              <MaterialIcon icon="play_circle" className="text-base text-primary" />
              {lessonCount} clases
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start">
        <LessonPlayer
          lesson={navigation.activeLesson}
          lessonIndex={navigation.activeLessonIndex}
          lessonCount={navigation.lessons.length}
          hasPreviousLesson={navigation.hasPreviousLesson}
          hasNextLesson={navigation.hasNextLesson}
          onPrevious={navigation.goToPreviousLesson}
          onNext={navigation.goToNextLesson}
        />
        <ModuleAccordion
          course={course}
          activeLessonId={navigation.activeLesson?.id ?? null}
          activeModuleId={navigation.activeModuleId}
          openModuleIds={navigation.openModuleIds}
          onSelectLesson={navigation.selectLesson}
          onToggleModule={navigation.toggleModule}
        />
      </div>
    </section>
  );
};
