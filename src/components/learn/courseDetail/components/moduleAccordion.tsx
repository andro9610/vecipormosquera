import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import type { Course, CourseLesson } from "../../types/course";
import { SectionHeading } from "../../components/sectionHeading";
import { LessonListItem } from "./lessonListItem";

type ModuleAccordionProps = {
  course: Course;
  activeLessonId: string | null;
  activeModuleId: string | null;
  openModuleIds: string[];
  onSelectLesson: (lesson: CourseLesson) => void;
  onToggleModule: (moduleId: string) => void;
};

export const ModuleAccordion = ({
  course,
  activeLessonId,
  activeModuleId,
  openModuleIds,
  onSelectLesson,
  onToggleModule,
}: ModuleAccordionProps) => {
  return (
    <section
      className="surface-panel p-4 md:p-5 lg:sticky lg:top-4"
      aria-labelledby="course-content-heading"
    >
      <div className="mb-3">
        <SectionHeading
          id="course-content-heading"
          title="Contenido del curso"
          icon="list_alt"
          titleClassName="text-lg"
          className="justify-between"
          trailing={<span className="badge badge-primary badge-sm">{course.modules.length}</span>}
        />
      </div>

      <div className="space-y-2">
        {course.modules.map((courseModule, moduleIndex) => {
          const isOpen = openModuleIds.includes(courseModule.id);
          const isActiveModule = activeModuleId === courseModule.id;
          const buttonId = `module-toggle-${courseModule.id}`;
          const contentId = `module-content-${courseModule.id}`;

          return (
            <div
              key={courseModule.id}
              className={`overflow-hidden rounded-xl border transition ${
                isActiveModule ? "border-primary/30 bg-primary/5" : "border-base-300/60"
              }`}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => onToggleModule(courseModule.id)}
                className="flex w-full items-start gap-3 px-3 py-3 text-left transition hover:bg-base-200/40"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                  {String(moduleIndex + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-snug md:text-base">
                    {courseModule.title}
                  </span>
                  <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-base-content/55">
                    <MaterialIcon icon="play_circle" className="text-sm" />
                    {courseModule.lessons.length} clases
                  </span>
                </span>
                <MaterialIcon
                  icon="expand_more"
                  className={`mt-1 shrink-0 text-base text-base-content/60 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
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
                  <ul className="space-y-1 px-2 pb-3">
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
    </section>
  );
};
