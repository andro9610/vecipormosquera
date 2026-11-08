import type { Course, CourseLesson } from "../types/course";
import { getYoutubeThumbnailUrl } from "../../../utilities/youtube";

export const flattenCourseLessons = (course: Course): CourseLesson[] =>
  course.modules.flatMap((courseModule) =>
    courseModule.lessons.map((lesson) => ({
      ...lesson,
      moduleId: courseModule.id,
      moduleTitle: courseModule.title,
    }))
  );

export const getCourseStats = (course: Course) => {
  const lessons = flattenCourseLessons(course);

  return {
    moduleCount: course.modules.length,
    lessonCount: lessons.length,
    thumbnailUrl: lessons[0] ? getYoutubeThumbnailUrl(lessons[0].videoUrl) : null,
  };
};
