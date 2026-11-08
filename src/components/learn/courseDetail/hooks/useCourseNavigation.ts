import { useMemo, useState } from "react";
import type { Course, CourseLesson } from "../../types/course";
import { flattenCourseLessons } from "../../utilities/courseStats";

export const useCourseNavigation = (course: Course | null) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[] | null>(null);

  const lessons = useMemo(() => (course ? flattenCourseLessons(course) : []), [course]);

  const defaultModuleIds = useMemo(
    () => (course?.modules[0] ? [course.modules[0].id] : []),
    [course]
  );

  const openModuleIds = expandedModuleIds ?? defaultModuleIds;

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
    setExpandedModuleIds((current) => {
      const base = current ?? defaultModuleIds;
      return base.includes(lesson.moduleId) ? base : [...base, lesson.moduleId];
    });
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModuleIds((current) => {
      const base = current ?? defaultModuleIds;
      return base.includes(moduleId)
        ? base.filter((id) => id !== moduleId)
        : [...base, moduleId];
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
    openModuleIds,
    selectLesson,
    toggleModule,
    goToPreviousLesson,
    goToNextLesson,
    hasPreviousLesson: activeLessonIndex > 0,
    hasNextLesson: activeLessonIndex >= 0 && activeLessonIndex < lessons.length - 1,
  };
};
