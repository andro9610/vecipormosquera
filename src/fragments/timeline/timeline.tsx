import React from "react";
import TimelineItem, { type TimelineItemProps } from "./timelineItem";

type TimeLineProps = {
  items: TimelineItemProps[];
};

export const TimeLine: React.FC<TimeLineProps> = ({ items }) => {
  return (
    <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical w-full">
      {items.map((it, idx) => {
        const { children, ...rest } = it as TimelineItemProps;
        return (
          <TimelineItem key={idx} {...rest}>
            {children}
          </TimelineItem>
        );
      })}
    </ul>
  );
};

export default TimeLine;