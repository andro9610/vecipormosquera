import { useParams } from "react-router-dom";
import { CourseFeedback } from "../components/courseFeedback";
import { useCourse } from "../hooks/useCourses";
import { CourseContent } from "./components/courseContent";
import { CourseDetailSkeleton } from "./components/courseDetailSkeleton";

export const CourseDetail = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { course, isLoading, isError } = useCourse(courseSlug);

  if (isLoading) return <CourseDetailSkeleton />;

  if (isError) {
    return (
      <CourseFeedback
        icon="error"
        tone="danger"
        title="No pudimos cargar el curso"
        description="Ocurrió un problema al consultar la información del curso. Intenta nuevamente más tarde."
      />
    );
  }

  if (!course) {
    return (
      <CourseFeedback
        icon="menu_book"
        title="Curso no encontrado"
        description="El curso que buscas no está disponible o cambió de dirección."
        actionLabel="Volver al catálogo"
        actionTo="/learn"
      />
    );
  }

  return <CourseContent key={course.id} course={course} />;
};
