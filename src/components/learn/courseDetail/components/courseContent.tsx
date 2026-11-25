import { useState } from "react";
import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import type { Course } from "../../types/course";
import { useCourseNavigation } from "../hooks/useCourseNavigation";
import { LessonPlayer } from "./lessonPlayer";
import { ModuleAccordion } from "./moduleAccordion";

type CourseContentProps = {
  course: Course;
};

export const CourseContent = ({ course }: CourseContentProps) => {
  const navigation = useCourseNavigation(course);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <section className="learn-shell learn-shell--detail">
      <div className={`learn-app ${isSidebarOpen ? "" : "learn-app--collapsed"}`}>
        {isSidebarOpen && (
          <ModuleAccordion
            course={course}
            activeLessonId={navigation.activeLesson?.id ?? null}
            activeModuleId={navigation.activeModuleId}
            activeLessonIndex={navigation.activeLessonIndex}
            lessonCount={navigation.lessons.length}
            openModuleId={navigation.openModuleId}
            onSelectLesson={navigation.selectLesson}
            onToggleModule={navigation.toggleModule}
            onCollapse={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="learn-main">
          {!isSidebarOpen && (
            <button
              type="button"
              className="learn-panel-toggle"
              onClick={() => setIsSidebarOpen(true)}
              aria-expanded="false"
              aria-controls="course-sidebar"
            >
              <MaterialIcon icon="left_panel_open" />
              Contenido del curso
            </button>
          )}

          <LessonPlayer
            lesson={navigation.activeLesson}
            hasPreviousLesson={navigation.hasPreviousLesson}
            hasNextLesson={navigation.hasNextLesson}
            onPrevious={navigation.goToPreviousLesson}
            onNext={navigation.goToNextLesson}
          />
        </div>
      </div>
    </section>
  );
};
