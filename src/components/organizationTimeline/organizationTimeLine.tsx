import TimeLine from "../../fragments/timeline/timeline"
import type { TimelineItemProps } from "../../fragments/timeline/timelineItem";
import { MaterialIcon } from "../../fragments/MaterialIcon";
import { useNavigate } from "react-router-dom";

export const OrganizationTimeline: React.FC = () => {
    const navigate = useNavigate();
    const defaultItems: TimelineItemProps[] = [
        {
            date: "2026-04-17",
            title: "Constitución de la veeduria",
            text: "En asamblea de constitución de la veeduria, se eligieron los miembros de la junta directiva y se establecieron los objetivos y metas.",
            children: (
                <button className="btn btn-sm btn-outline gap-2" onClick={() => navigate("bylaws")}>
                    <MaterialIcon icon="gavel" className="" />
                    Estatutos aprobados
                    <MaterialIcon icon="chevron_right" className="ml-auto" />
                </button>
            ),
            variant: "primary",
            tag: "Linea Base",
            visibleTag: true,
        },
    ];

    return (
        <>
            <h1 className="text-4xl">Conoce la historia de nuestra veeduria</h1>
            <TimeLine items={defaultItems} />
        </>
    );
}