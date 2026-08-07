import type { Variant } from "../types/variant";

export const variantToClasses: Record<Variant, { outer: string; badge: string }> = {
    primary: { outer: "bg-primary/20", badge: "badge-primary" },
    success: { outer: "bg-success/20", badge: "badge-success" },
    info: { outer: "bg-info/20", badge: "badge-info" },
};