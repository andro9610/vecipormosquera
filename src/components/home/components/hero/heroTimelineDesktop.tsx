import type { TimelineItemProps } from "../../../../fragments/timeline/timelineItem";
import { formatDateToEsCo } from "../../../../utilities/dateUtilities";

type HeroTimelineDesktopProps = {
  items: TimelineItemProps[];
  activeIndex: number;
  activeItem?: TimelineItemProps;
  onSelect: (index: number) => void;
};

export const HeroTimelineDesktop = ({ items, activeIndex, activeItem, onSelect }: HeroTimelineDesktopProps) => {
  const lastIndex = items.length - 1;

  return (
    <div className="mt-auto hidden gap-4 lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:items-end">
      <ol className="flex gap-2 overflow-x-auto rounded-2xl border border-white/15 bg-black/30 p-2 backdrop-blur-md lg:flex-col lg:gap-1.5 lg:overflow-visible">
        {items.map((item, index) => {
          const isActive = index === Math.min(activeIndex, lastIndex);

          return (
            <li key={index} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive}
                className={`flex w-44 items-start gap-2 rounded-xl border px-3 py-2 text-left transition lg:w-full ${
                  isActive ? "border-secondary/70 bg-white/15" : "border-white/10 hover:bg-white/10"
                }`}
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
          <h2 className="mt-3 text-3xl leading-tight text-white md:text-5xl">{activeItem.title}</h2>
          {activeItem.text && <p className="mt-3 max-w-xl text-sm text-white/85 md:text-base">{activeItem.text}</p>}
          {activeItem.children && <div className="mt-5">{activeItem.children}</div>}
        </div>
      )}
    </div>
  );
};
