import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import type { CourseLesson } from "../../types/course";
import { SectionHeading } from "../../components/sectionHeading";
import { getYoutubeEmbedUrl } from "../../../../utilities/youtube";

type LessonPlayerProps = {
  lesson: CourseLesson | null;
  lessonIndex: number;
  lessonCount: number;
  hasPreviousLesson: boolean;
  hasNextLesson: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export const LessonPlayer = ({
  lesson,
  lessonIndex,
  lessonCount,
  hasPreviousLesson,
  hasNextLesson,
  onPrevious,
  onNext,
}: LessonPlayerProps) => {
  if (!lesson) {
    return (
      <div className="surface-panel p-5">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-base-300/80 py-16 text-center">
          <MaterialIcon icon="video_library" className="text-4xl text-primary/70" />
          <p className="text-sm text-base-content/70">Este curso aún no tiene clases disponibles.</p>
        </div>
      </div>
    );
  }

  const embedUrl = getYoutubeEmbedUrl(lesson.videoUrl);

  return (
    <article className="surface-panel overflow-hidden" aria-labelledby="lesson-heading">
      <div className="relative aspect-video w-full bg-black">
        {embedUrl ? (
          <iframe
            key={lesson.id}
            src={embedUrl}
            title={lesson.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-white/80">
            <MaterialIcon icon="link_off" className="text-4xl" />
            <p className="text-sm">El video de esta clase no está disponible.</p>
          </div>
        )}
      </div>

      <div className="space-y-4 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-base-content/60">
          <span className="badge badge-primary badge-sm">{lesson.moduleTitle}</span>
          <span>
            Clase {lessonIndex + 1} de {lessonCount}
          </span>
          {lesson.duration && (
            <span className="inline-flex items-center gap-1">
              <MaterialIcon icon="schedule" className="text-sm" />
              {lesson.duration}
            </span>
          )}
        </div>

        <div>
          <SectionHeading
            id="lesson-heading"
            title={lesson.title}
            titleClassName="text-xl md:text-2xl"
          />
          <p className="mt-2 text-sm leading-relaxed text-base-content/80 md:text-base">
            {lesson.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-base-300/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="btn btn-outline btn-sm w-full justify-start gap-1 sm:w-auto sm:justify-center"
            onClick={onPrevious}
            disabled={!hasPreviousLesson}
          >
            <MaterialIcon icon="chevron_left" className="text-base" />
            Clase anterior
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm w-full justify-between gap-1 sm:w-auto sm:justify-center"
            onClick={onNext}
            disabled={!hasNextLesson}
          >
            Siguiente clase
            <MaterialIcon icon="chevron_right" className="text-base" />
          </button>
        </div>
      </div>
    </article>
  );
};
