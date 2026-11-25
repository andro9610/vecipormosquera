import { Link } from "react-router-dom";
import { MaterialIcon } from "../../../fragments/materialIcon/MaterialIcon";
import type { Course } from "../types/course";
import { getCourseStats } from "../utilities/courseStats";

type CourseCardProps = {
  course: Course;
  index?: number;
};

export const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
  const { thumbnailUrl } = getCourseStats(course);

  return (
    <Link
      to={`/learn/${course.slug}`}
      className={`learn-card learn-card--accent-${(index % 4) + 1}`}
    >
      <div className="learn-card__media">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={`Portada del curso ${course.title}`} loading="lazy" />
        ) : (
          <div className="learn-card__media-fallback">
            <MaterialIcon icon={course.icon} fill={1} />
          </div>
        )}
        <span className="learn-card__play">
          <MaterialIcon icon="play_arrow" fill={1} />
        </span>
      </div>

      <div className="learn-card__body">
        <span className="learn-card__index">{String(index + 1).padStart(2, "0")}</span>
        <h2 className="learn-card__title">{course.title}</h2>
        <p className="learn-card__desc">{course.description}</p>

        <div className="learn-card__foot">
          Explorar curso
          <span className="learn-card__arrow">
            <MaterialIcon icon="north_east" />
          </span>
        </div>
      </div>
    </Link>
  );
};
