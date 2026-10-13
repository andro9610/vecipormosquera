import { MaterialIcon } from "../../../../../../../fragments/materialIcon/MaterialIcon";
import type { TimelineItemProps } from "../../../../../../../fragments/timeline/timelineItem";
import { useNavigate } from "react-router-dom";

export const useTimelineItems = () => {
    const navigate = useNavigate();
    const heroImage = `${import.meta.env.BASE_URL}logo_vector.svg`;

    const timelineItems: TimelineItemProps[] = [
        {
            title: "Constitución de la veeduría",
            text: "En asamblea general la comunidad decide crear la veeduría ciudadana por el pueblo de Mosquera.",
            date: "2026-04-17",
            tag: "Línea base",
            visibleTag: true,
            image: heroImage,
            children:
                <button className="btn btn-sm border-white/60 bg-white/10 text-white backdrop-blur transition hover:bg-white/25" onClick={() => navigate('bylaws')} >
                    <MaterialIcon icon="gavel" className="text-sm" />
                    Consultar estatutos
                </button>,
        },
    ];

    return { timelineItems };
}
