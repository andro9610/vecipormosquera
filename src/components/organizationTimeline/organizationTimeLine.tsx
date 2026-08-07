import TimeLine from "../../fragments/timeline/timeline";
import { TimelineFilter } from "./components/timelineFilter/timelineFilter";
import { useTimelineItems } from "./components/timelineFilter/hooks/useTimelineItems";
import { useTimeLineFilterTools } from "./components/timelineFilter/hooks/useTimelineFilterTools";

export const OrganizationTimeline: React.FC = () => {
    const { timelineItems } = useTimelineItems();
    const { tags, selectedTag, setSelectedTag, filteredItems } = useTimeLineFilterTools(timelineItems);

    return (
        <>
            <h1 className="text-4xl">Conoce la historia de nuestra veeduria</h1>
            <TimelineFilter tags={tags} selectedTag={selectedTag} onChange={setSelectedTag} />
            <div className="border border-gray-300 rounded-lg p-4 mt-4 shadow-md">
                <TimeLine items={filteredItems} />
            </div>
        </>
    );
};