import React from "react";

type Variant = "primary" | "success" | "info";

export type TimelineItemProps = {
    date: string | Date;
    title: string;
    text?: string;
    children?: React.ReactNode;
    variant?: Variant;
    tag?: string;
    visibleTag?: boolean;
};

const variantToClasses: Record<Variant, { outer: string; badge: string }> = {
    primary: { outer: "bg-primary/20", badge: "badge-primary" },
    success: { outer: "bg-success/20", badge: "badge-success" },
    info: { outer: "bg-info/20", badge: "badge-info" },
};

function formatDateToEsCo(d: string | Date) {
    const date = typeof d === "string" ? new Date(d) : d;
    try {
        return date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
    } catch {
        return date.toDateString();
    }
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, text, children, variant = "primary", tag, visibleTag = false }) => {
    const classes = variantToClasses[variant];

    return (
        <>
            <span className="mt-2 text-sm">{formatDateToEsCo(date)}</span>
            <li>
                <div className="timeline-middle">
                    <span className={`${classes.outer} flex size-4.5 items-center justify-center rounded-full`}>
                        <span className={`badge ${classes.badge} size-3 rounded-full p-0`}></span>
                    </span>
                </div>
                <div className="timeline-end ms-2 m-3 w-full rounded-lg">
                    <div className="text-base-content pt-0.5 mb-3 font-medium flex items-center gap-2">
                        <span>{title}</span>
                        {visibleTag && tag && (
                            <span className="badge text-sm badge-secondary">{tag}</span>
                        )}
                    </div>
                    {text && <p className="mb-2">{text}</p>}
                    {children}
                </div>
                <hr />
            </li>
        </>
    );
};

export default TimelineItem;
