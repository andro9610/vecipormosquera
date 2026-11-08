import { useEffect, useMemo, useState } from "react";
import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { HeroTimelineDesktop } from "./components/hero/heroTimelineDesktop";
import { HeroTimelineMobile } from "./components/hero/heroTimelineMobile";
import { JoinUsModal } from "./components/joinUsModal";
import { Members } from "./components/members/members";
import { Partners } from "./components/partners/partners";
import { timelineItems } from "./const/timelineItems";

const AUTOPLAY_MS = 6000;

const slideGradients = [
  "bg-gradient-to-br from-primary via-accent to-neutral",
  "bg-gradient-to-br from-secondary via-primary to-accent",
  "bg-gradient-to-br from-accent via-primary to-secondary",
  "bg-gradient-to-br from-neutral via-accent to-primary",
];

export const Home = () => {
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = timelineItems.length;

  useEffect(() => {
    if (total > 0 && activeIndex > total - 1) {
      setActiveIndex(total - 1);
    }
  }, [total, activeIndex]);

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(intervalId);
  }, [total, isPaused, activeIndex]);

  const activeItem = useMemo(
    () => (total > 0 ? timelineItems[Math.min(activeIndex, total - 1)] : undefined),
    [activeIndex, total],
  );

  return (
    <>
      <div className="pb-10">
        <section className="relative overflow-hidden bg-white/90 dark:bg-base-200/70">
          <div
            className="relative min-h-screen lg:min-h-[92vh]"
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <div className="absolute inset-0">
              {activeItem?.image ? (
                <img
                  key={`image-${activeIndex}`}
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="h-full w-full object-cover animate-[subtle-rise_0.6s_ease-out]"
                />
              ) : (
                <div
                  key={`gradient-${activeIndex}`}
                  className={`h-full w-full animate-[subtle-rise_0.6s_ease-out] ${slideGradients[activeIndex % slideGradients.length]}`}
                >
                  <MaterialIcon icon="emoji_events" fill={1} className="absolute right-8 top-8 text-7xl text-white/20" />
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-black/40" />

            <div className="relative flex min-h-[70vh] flex-col px-4 pb-4 pt-24 md:px-6 md:pb-6 md:pt-28 lg:min-h-[80vh]">
              <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6">
                <HeroTimelineMobile
                  items={timelineItems}
                  openIndex={openIndex}
                  onToggle={(index) => setOpenIndex(index === openIndex ? -1 : index)}
                />
                <HeroTimelineDesktop
                  items={timelineItems}
                  activeIndex={activeIndex}
                  activeItem={activeItem}
                  onSelect={setActiveIndex}
                />

                <div className="hidden items-center gap-2 lg:flex">
                  {timelineItems.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Ir al hito ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-secondary" : "w-3 bg-white/50 hover:bg-white/80"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-4 border-t border-base-300/60 bg-white/70 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 dark:bg-base-200/60">
            <Partners />
            <button
              type="button"
              className="btn btn-primary w-full md:w-auto"
              onClick={() => setIsJoinUsOpen(true)}
            >
              <MaterialIcon icon="group_add" />
              Únete a nosotros
            </button>
          </div>
        </section>

        <div className="mt-6 px-4 md:px-6">
          <Members />
        </div>
      </div>
      <JoinUsModal isOpen={isJoinUsOpen} onClose={() => setIsJoinUsOpen(false)} />
    </>
  );
};
