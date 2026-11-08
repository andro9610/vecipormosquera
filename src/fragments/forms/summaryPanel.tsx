import type { ReactNode } from "react";
import { MaterialIcon } from "../materialIcon/MaterialIcon";

type SummaryPanelProps = {
  children: ReactNode;
};

type SummarySectionProps = {
  title: string;
  items: Array<{ label: string; value: string }>;
};

type SummaryNoticeProps = {
  icon: string;
  children: ReactNode;
};

export const SummaryPanel = ({ children }: SummaryPanelProps) => (
  <div className="surface-panel bg-base-200/30 p-4">
    <p className="text-sm leading-relaxed text-base-content/80">{children}</p>
  </div>
);

export const SummarySection = ({ title, items }: SummarySectionProps) => (
  <div className="surface-panel bg-base-200/30 p-4">
    <h5 className="mb-2 font-semibold text-base-content">{title}</h5>
    <ul className="space-y-1 text-sm text-base-content/80">
      {items.map((item) => (
        <li key={item.label}>
          {item.label}: {item.value}
        </li>
      ))}
    </ul>
  </div>
);

export const SummaryNotice = ({ icon, children }: SummaryNoticeProps) => (
  <div role="note" className="surface-danger flex items-start gap-2 rounded-xl p-3 text-sm font-medium">
    <MaterialIcon icon={icon} className="mt-0.5 shrink-0" />
    <p className="m-0">{children}</p>
  </div>
);
