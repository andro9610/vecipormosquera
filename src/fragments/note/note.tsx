import type { ReactNode } from "react";
import { MaterialIcon } from "../materialIcon/MaterialIcon";

export type NoteVariant = "warning" | "info";

export type NoteProps = {
    variant: NoteVariant;
    children: ReactNode;
};

const variantStyles: Record<NoteVariant, { surface: string; icon: string; iconName: string }> = {
    warning: {
        surface: "surface-warning",
        icon: "text-warning",
        iconName: "warning",
    },
    info: {
        surface: "surface-info",
        icon: "text-info",
        iconName: "info",
    },
};

export const Note: React.FC<NoteProps> = ({ variant, children }) => {
    const styles = variantStyles[variant];

    return (
        <div
            role="note"
            className={`${styles.surface} flex items-start gap-3 rounded-xl p-4 text-sm font-medium`}
        >
            <MaterialIcon icon={styles.iconName} className={`mt-0.5 shrink-0 text-xl ${styles.icon}`} />
            <p className="m-0 leading-relaxed">{children}</p>
        </div>
    );
};
