import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { coursesSeed } from "../const/courses";
import type { Course } from "../types/course";

export const useCourses = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["courses"],
    queryFn: async (): Promise<Course[]> => coursesSeed,
    staleTime: Number.POSITIVE_INFINITY,
  });

  return { courses: data ?? [], ...rest };
};

export const useCourse = (slug?: string) => {
  const { courses, ...rest } = useCourses();

  const course = useMemo(
    () => courses.find((item) => item.slug === slug) ?? null,
    [courses, slug]
  );

  return { course, ...rest };
};
