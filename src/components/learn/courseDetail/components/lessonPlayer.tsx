import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import type { CourseLesson } from "../../types/course";
import { getYoutubeEmbedUrl } from "../../../../utilities/youtube";

type LessonPlayerProps = {
  lesson: CourseLesson | null;
  hasPreviousLesson: boolean;
  hasNextLesson: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export const LessonPlayer = ({
  lesson,
  hasPreviousLesson,
  hasNextLesson,
  onPrevious,
  onNext,
}: LessonPlayerProps) => {
  if (!lesson) {
    return (
      <div className="learn-feedback">
        <span className="learn-feedback__icon">
          <MaterialIcon icon="video_library" />
        </span>
        <h2>Este curso aún no tiene clases</h2>
        <p>Estamos preparando el contenido. Mientras tanto, puedes explorar otros cursos del catálogo.</p>
      </div>
    );
  }

  const embedUrl = getYoutubeEmbedUrl(lesson.videoUrl);

  return (
    <article className="learn-player" aria-label={lesson.title}>
      <div className="learn-player__screen">
        {embedUrl ? (
          <iframe
            key={lesson.id}
            src={embedUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="learn-player__fallback">
            <MaterialIcon icon="link_off" />
            <span>El video de esta clase no está disponible.</span>
          </div>
        )}
      </div>

      <div className="learn-player__body">
        <p className="learn-player__desc">{lesson.description}</p>

        <div className="learn-player__nav">
          <button
            type="button"
            className="learn-btn learn-btn--ghost"
            onClick={onPrevious}
            disabled={!hasPreviousLesson}
          >
            <MaterialIcon icon="chevron_left" />
            Clase anterior
          </button>
          <button
            type="button"
            className="learn-btn learn-btn--solid"
            onClick={onNext}
            disabled={!hasNextLesson}
          >
            Siguiente clase
            <MaterialIcon icon="arrow_forward" />
          </button>
        </div>
      </div>
    </article>
  );
};
