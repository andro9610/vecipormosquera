import { useMemo, useState } from "react";
import type { TimelineItemProps } from "../../../../../fragments/timeline/timelineItem";

export const useTimeLineFilterTools = (timelineItems: TimelineItemProps[]) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const tags = useMemo(() => {
        const tagSet = new Set<string>();
        timelineItems.forEach((item) => {
            if (item.tag) {
                tagSet.add(item.tag);
            }
        });

        return Array.from(tagSet);
    }, []);

    const filteredItems = useMemo(() => {
        if (!selectedTag) {
            return timelineItems;
        }

        return timelineItems.filter((item) => item.tag === selectedTag);
    }, [selectedTag]);

    return {
        tags,
        selectedTag,
        setSelectedTag,
        filteredItems,
    };
}