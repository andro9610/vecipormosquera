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
    <div className={`learn-feedback ${tone === "danger" ? "learn-feedback--danger" : ""}`}>
      <span className="learn-feedback__icon">
        <MaterialIcon icon={icon} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="learn-btn learn-btn--solid mt-1">
          <MaterialIcon icon={actionIcon} />
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
