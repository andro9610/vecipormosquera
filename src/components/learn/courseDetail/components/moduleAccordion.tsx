import type { CSSProperties } from "react";
import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import type { Course, CourseLesson } from "../../types/course";
import { LessonListItem } from "./lessonListItem";

type ModuleAccordionProps = {
  course: Course;
  activeLessonId: string | null;
  activeModuleId: string | null;
  activeLessonIndex: number;
  lessonCount: number;
  openModuleId: string | null;
  onSelectLesson: (lesson: CourseLesson) => void;
  onToggleModule: (moduleId: string) => void;
  onCollapse: () => void;
};

export const ModuleAccordion = ({
  course,
  activeLessonId,
  activeModuleId,
  activeLessonIndex,
  lessonCount,
  openModuleId,
  onSelectLesson,
  onToggleModule,
  onCollapse,
}: ModuleAccordionProps) => {
  const progress =
    activeLessonIndex >= 0 && lessonCount > 0
      ? Math.round(((activeLessonIndex + 1) / lessonCount) * 100)
      : 0;

  return (
    <aside id="course-sidebar" className="learn-sidebar" aria-labelledby="course-heading">
      <div className="learn-sidebar__top">
        <h1 id="course-heading" className="learn-sidebar__course">
          {course.title}
        </h1>
        <button
          type="button"
          className="learn-sidebar__toggle"
          onClick={onCollapse}
          aria-label="Contraer contenido del curso"
          aria-expanded="true"
          aria-controls="course-sidebar"
        >
          <MaterialIcon icon="left_panel_close" />
        </button>
      </div>

      <div className="learn-sidebar__progress">
        <span
          className="learn-ring learn-ring--sm"
          style={{ "--learn-progress": `${progress}%` } as CSSProperties}
          aria-hidden="true"
        >
          <span className="learn-ring__orbit" />
          <span className="learn-ring__inner">
            <span className="learn-ring__value">{progress}%</span>
            <span className="learn-ring__label">Avance</span>
          </span>
        </span>
      </div>

      <span className="learn-sidebar__rule" aria-hidden="true" />
      <span className="learn-sidebar__section">Contenido del curso</span>

      <div className="learn-modules">
        {course.modules.map((courseModule, moduleIndex) => {
          const isOpen = openModuleId === courseModule.id;
          const isActiveModule = activeModuleId === courseModule.id;
          const buttonId = `module-toggle-${courseModule.id}`;
          const contentId = `module-content-${courseModule.id}`;

          return (
            <div
              key={courseModule.id}
              className={`learn-module ${isActiveModule ? "learn-module--active" : ""}`}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => onToggleModule(courseModule.id)}
                className="learn-module__toggle"
              >
                <span className="learn-module__badge">
                  {String(moduleIndex + 1).padStart(2, "0")}
                </span>
                <span className="learn-module__text">
                  <span className="learn-module__eyebrow">Módulo {moduleIndex + 1}</span>
                  <span className="learn-module__title">{courseModule.title}</span>
                </span>
                <MaterialIcon
                  icon="expand_more"
                  className={`learn-module__chevron ${isOpen ? "is-open" : ""}`}
                />
              </button>

              <div
                id={contentId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="learn-lessons">
                    {courseModule.lessons.map((lesson, lessonIndex) => (
                      <LessonListItem
                        key={lesson.id}
                        lesson={{ ...lesson, moduleId: courseModule.id, moduleTitle: courseModule.title }}
                        index={lessonIndex}
                        isActive={lesson.id === activeLessonId}
                        onSelect={onSelectLesson}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
