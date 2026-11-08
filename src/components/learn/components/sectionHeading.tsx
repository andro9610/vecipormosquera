import type { ReactNode } from "react";
import { MaterialIcon } from "../../../fragments/materialIcon/MaterialIcon";

type SectionHeadingProps = {
  id?: string;
  title: string;
  icon?: string;
  as?: "h1" | "h2" | "h3";
  titleClassName?: string;
  className?: string;
  trailing?: ReactNode;
};

export const SectionHeading = ({
  id,
  title,
  icon,
  as = "h2",
  titleClassName = "text-xl md:text-2xl",
  className = "",
  trailing,
}: SectionHeadingProps) => {
  const Heading = as;

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
        Sección
      </span>
      <Heading id={id} className={`flex items-center gap-2 ${titleClassName}`}>
        {icon && <MaterialIcon icon={icon} className="text-primary" />}
        <span>{title}</span>
      </Heading>
      {trailing}
    </div>
  );
};
