import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import type { CourseLesson } from "../../types/course";

type LessonListItemProps = {
  lesson: CourseLesson;
  index: number;
  isActive: boolean;
  onSelect: (lesson: CourseLesson) => void;
};

export const LessonListItem = ({ lesson, index, isActive, onSelect }: LessonListItemProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(lesson)}
        aria-current={isActive ? "true" : undefined}
        className={`learn-lesson ${isActive ? "learn-lesson--active" : ""}`}
      >
        <span className="learn-lesson__marker">
          {isActive ? (
            <MaterialIcon icon="play_arrow" fill={1} />
          ) : (
            String(index + 1).padStart(2, "0")
          )}
        </span>
        <span className="learn-lesson__text">
          <span className="learn-lesson__title">{lesson.title}</span>
          {lesson.duration && (
            <span className="learn-lesson__duration">
              <MaterialIcon icon="schedule" />
              {lesson.duration}
            </span>
          )}
        </span>
      </button>
    </li>
  );
};
