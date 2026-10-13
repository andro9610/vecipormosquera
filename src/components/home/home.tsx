import { useEffect, useMemo, useState } from "react";
import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { useDateTools } from "../../hooks/useDateTools";
import { JoinUsModal } from "./components/joinUsModal";
import { Members } from "./components/members/members";
import { Partners } from "./components/partners/partners";
import { useTimelineItems } from "./components/organizationTimeline/components/timelineFilter/hooks/useTimelineItems";

const AUTOPLAY_MS = 6000;

const slideGradients = [
    "bg-gradient-to-br from-primary via-accent to-neutral",
    "bg-gradient-to-br from-secondary via-primary to-accent",
    "bg-gradient-to-br from-accent via-primary to-secondary",
    "bg-gradient-to-br from-neutral via-accent to-primary",
];

export const Home = () => {
    const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);
    const { timelineItems } = useTimelineItems();
    const { formatDateToEsCo } = useDateTools();
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
        [timelineItems, activeIndex, total]
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
                                <div className="mt-auto flex flex-col gap-2 lg:hidden">
                                    {timelineItems.map((item, index) => {
                                        const isOpen = index === openIndex;
                                        return (
                                            <div
                                                key={`mobile-${index}`}
                                                className="overflow-hidden rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                                    aria-expanded={isOpen}
                                                    className="flex w-full items-center gap-3 px-3 py-3 text-left"
                                                >
                                                    <span className={`size-2.5 shrink-0 rounded-full ${isOpen ? "bg-secondary" : "bg-white/40"}`} />
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/60">
                                                            {formatDateToEsCo(item.date)}
                                                        </span>
                                                        <span className="mt-0.5 block text-sm font-semibold text-white">
                                                            {item.title}
                                                        </span>
                                                    </span>
                                                    <MaterialIcon
                                                        icon={isOpen ? "expand_less" : "expand_more"}
                                                        className="shrink-0 text-white/70"
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="animate-[subtle-rise_0.3s_ease-out] px-3 pb-3 text-white">
                                                        {item.tag && (
                                                            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary-content">
                                                                {item.tag}
                                                            </span>
                                                        )}
                                                        {item.text && (
                                                            <p className="mt-2 text-sm text-white/85">{item.text}</p>
                                                        )}
                                                        {item.children && <div className="mt-3">{item.children}</div>}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-auto hidden gap-4 lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:items-end">
                                    <ol className="flex gap-2 overflow-x-auto rounded-2xl border border-white/15 bg-black/30 p-2 backdrop-blur-md lg:flex-col lg:gap-1.5 lg:overflow-visible">
                                        {timelineItems.map((item, index) => {
                                            const isActive = index === Math.min(activeIndex, total - 1);
                                            return (
                                                <li key={index} className="shrink-0 lg:shrink">
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveIndex(index)}
                                                        aria-current={isActive}
                                                        className={`flex w-44 items-start gap-2 rounded-xl border px-3 py-2 text-left transition lg:w-full ${isActive ? "border-secondary/70 bg-white/15" : "border-white/10 hover:bg-white/10"}`}
                                                    >
                                                        <span className={`mt-1 size-2.5 shrink-0 rounded-full ${isActive ? "bg-secondary" : "bg-white/40"}`} />
                                                        <span className="min-w-0">
                                                            <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/60">
                                                                {formatDateToEsCo(item.date)}
                                                            </span>
                                                            <span className="mt-0.5 block truncate text-xs font-semibold text-white lg:whitespace-normal">
                                                                {item.title}
                                                            </span>
                                                        </span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ol>

                                    {activeItem && (
                                        <div key={`content-${activeIndex}`} className="max-w-2xl animate-[subtle-rise_0.6s_ease-out] text-white">
                                            {activeItem.tag && (
                                                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-content">
                                                    {activeItem.tag}
                                                </span>
                                            )}
                                            <h2 className="mt-3 text-3xl leading-tight text-white md:text-5xl">
                                                {activeItem.title}
                                            </h2>
                                            {activeItem.text && (
                                                <p className="mt-3 max-w-xl text-sm text-white/85 md:text-base">
                                                    {activeItem.text}
                                                </p>
                                            )}
                                            {activeItem.children && (
                                                <div className="mt-5">{activeItem.children}</div>
                                            )}
                                        </div>
                                    )}
                                </div>

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
}
