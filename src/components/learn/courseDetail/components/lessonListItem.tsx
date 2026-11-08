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
        className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
          isActive
            ? "border-primary/50 bg-primary/10"
            : "border-transparent hover:border-base-300/70 hover:bg-base-200/50"
        }`}
      >
        <span
          className={`mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            isActive ? "bg-primary text-primary-content" : "bg-base-300/70 text-base-content/70"
          }`}
        >
          {isActive ? <MaterialIcon icon="play_arrow" className="text-base" fill={1} /> : index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block text-sm font-semibold leading-snug ${
              isActive ? "text-primary" : "text-base-content"
            }`}
          >
            {lesson.title}
          </span>
          {lesson.duration && (
            <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-base-content/55">
              <MaterialIcon icon="schedule" className="text-sm" />
              {lesson.duration}
            </span>
          )}
        </span>
      </button>
    </li>
  );
};
