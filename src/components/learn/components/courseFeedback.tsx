import { Link } from "react-router-dom";
import { MaterialIcon } from "../../../fragments/materialIcon/MaterialIcon";

type CourseFeedbackTone = "primary" | "danger";

type CourseFeedbackProps = {
  icon: string;
  title: string;
  description: string;
  tone?: CourseFeedbackTone;
  actionLabel?: string;
  actionTo?: string;
  actionIcon?: string;
};

const toneClasses: Record<CourseFeedbackTone, string> = {
  primary: "text-primary/70",
  danger: "text-danger",
};

export const CourseFeedback = ({
  icon,
  title,
  description,
  tone = "primary",
  actionLabel,
  actionTo,
  actionIcon = "arrow_back",
}: CourseFeedbackProps) => {
  return (
    <div className="surface-panel flex flex-col items-center gap-3 p-8 text-center">
      <MaterialIcon icon={icon} className={`text-4xl ${toneClasses[tone]}`} />
      <h2 className="text-xl md:text-2xl">{title}</h2>
      <p className="max-w-xl text-sm text-base-content/70">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary btn-sm mt-1 gap-1">
          <MaterialIcon icon={actionIcon} className="text-base" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
