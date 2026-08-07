import { MaterialIcon } from "../../../../../fragments/materialIcon/MaterialIcon";
import type { TimelineItemProps } from "../../../../../fragments/timeline/timelineItem";
import { useNavigate } from "react-router-dom";

export const useTimelineItems = () => {
    const navigate = useNavigate();
    const timelineItems: TimelineItemProps[] = [
        {
            title: "Constitución de la veeduría",
            text: "En asamblea general de la comunidad se decide crear la veeduría ciudadana.",
            date: "2026-04-17",
            tag: "Linea base",
            visibleTag: true,
            children:
                <button className="btn btn-outline text-sm" onClick={() => navigate('bylaws')} >
                    <MaterialIcon icon="gavel" className="text-sm" />
                    Consultar Estatutos
                </button>,
        },
    ];

    return { timelineItems };
}


