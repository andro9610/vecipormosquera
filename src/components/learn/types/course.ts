export type Lesson = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration?: string;
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  level: string;
  modules: CourseModule[];
};

export type CourseLesson = Lesson & {
  moduleId: string;
  moduleTitle: string;
};
