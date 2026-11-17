import { MaterialIcon } from "../../../fragments/materialIcon/MaterialIcon";
import type { TimelineItemProps } from "../../../fragments/timeline/timelineItem";
import { getPublicStorageUrl } from "../../../utilities/storageUtilities";
import { Link } from "react-router-dom";

const heroImage = getPublicStorageUrl("assets/logo/logo_vector.svg");

export const timelineItems: TimelineItemProps[] = [
  {
    title: "Constitución de la veeduría",
    text: "En asamblea general la comunidad decide crear la veeduría ciudadana por el pueblo de Mosquera.",
    date: "2026-04-17",
    tag: "Línea base",
    visibleTag: true,
    image: heroImage,
    children: (
      <Link
        to="/bylaws"
        className="btn btn-sm border-white/60 bg-white/10 text-white backdrop-blur transition hover:bg-white/25"
      >
        <MaterialIcon icon="gavel" className="text-sm" />
        Consultar estatutos
      </Link>
    ),
  },
];
