import { useMemo, useState } from "react";
import type { Course, CourseLesson } from "../../types/course";
import { flattenCourseLessons } from "../../utilities/courseStats";

export const useCourseNavigation = (course: Course | null) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const lessons = useMemo(() => (course ? flattenCourseLessons(course) : []), [course]);

  const defaultModuleId = course?.modules[0]?.id ?? null;

  const openModuleId = expandedModuleId ?? defaultModuleId;

  const activeLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0] ?? null,
    [lessons, selectedLessonId]
  );

  const activeLessonIndex = activeLesson
    ? lessons.findIndex((lesson) => lesson.id === activeLesson.id)
    : -1;

  const activeModuleId = activeLesson?.moduleId ?? course?.modules[0]?.id ?? null;

  const selectLesson = (lesson: CourseLesson) => {
    setSelectedLessonId(lesson.id);
    setExpandedModuleId(lesson.moduleId);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModuleId((current) => {
      const base = current ?? defaultModuleId;
      return base === moduleId ? null : moduleId;
    });
  };

  const goToLesson = (index: number) => {
    const lesson = lessons[index];
    if (lesson) selectLesson(lesson);
  };

  const goToPreviousLesson = () => {
    if (activeLessonIndex > 0) goToLesson(activeLessonIndex - 1);
  };

  const goToNextLesson = () => {
    if (activeLessonIndex >= 0 && activeLessonIndex < lessons.length - 1) {
      goToLesson(activeLessonIndex + 1);
    }
  };

  return {
    lessons,
    activeLesson,
    activeLessonIndex,
    activeModuleId,
    openModuleId,
    selectLesson,
    toggleModule,
    goToPreviousLesson,
    goToNextLesson,
    hasPreviousLesson: activeLessonIndex > 0,
    hasNextLesson: activeLessonIndex >= 0 && activeLessonIndex < lessons.length - 1,
  };
};
