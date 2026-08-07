import React from "react";
import type { Variant } from "./types/variant";
import { variantToClasses } from "./const/variantToClases";
import { useDateTools } from "../../hooks/useDateTools";

export type TimelineItemProps = {
    date: string | Date;
    title: string;
    text?: string;
    children?: React.ReactNode;
    variant?: Variant;
    tag?: string;
    visibleTag?: boolean;
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, text, children, variant = "primary", tag, visibleTag = false }) => {
    const classes = variantToClasses[variant];
    const { formatDateToEsCo } = useDateTools();

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
