import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import type { TimelineItemProps } from "../../../../fragments/timeline/timelineItem";
import { formatDateToEsCo } from "../../../../utilities/dateUtilities";

type HeroTimelineMobileProps = {
  items: TimelineItemProps[];
  openIndex: number;
  onToggle: (index: number) => void;
};

export const HeroTimelineMobile = ({ items, openIndex, onToggle }: HeroTimelineMobileProps) => (
  <div className="mt-auto flex flex-col gap-2 lg:hidden">
    {items.map((item, index) => {
      const isOpen = index === openIndex;

      return (
        <div
          key={`mobile-${index}`}
          className="overflow-hidden rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => onToggle(index)}
            aria-expanded={isOpen}
            className="flex w-full items-center gap-3 px-3 py-3 text-left"
          >
            <span className={`size-2.5 shrink-0 rounded-full ${isOpen ? "bg-secondary" : "bg-white/40"}`} />
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/60">
                {formatDateToEsCo(item.date)}
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-white">{item.title}</span>
            </span>
            <MaterialIcon icon={isOpen ? "expand_less" : "expand_more"} className="shrink-0 text-white/70" />
          </button>
          {isOpen && (
            <div className="animate-[subtle-rise_0.3s_ease-out] px-3 pb-3 text-white">
              {item.tag && (
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary-content">
                  {item.tag}
                </span>
              )}
              {item.text && <p className="mt-2 text-sm text-white/85">{item.text}</p>}
              {item.children && <div className="mt-3">{item.children}</div>}
            </div>
          )}
        </div>
      );
    })}
  </div>
);
