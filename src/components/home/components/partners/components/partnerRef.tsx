import type { Partner } from "../types/partner";

type PartnerRefProps = {
  partner: Partner;
}

export const PartnerRef: React.FC<PartnerRefProps> = ({ partner }) => {
  const { name, logoSrc, websiteUrl } = partner;
  const href = websiteUrl || "#";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={name}
      aria-label={name}
      className="flex items-center justify-center gap-2 text-slate-500 opacity-70 hover:opacity-100 transition-opacity"
    >
      {logoSrc && (
        <img
          src={logoSrc}
          alt={name}
          className="h-10 w-10 object-contain grayscale"
        />
      )}
      <span className="text-base font-bold tracking-tight text-slate-700">{name}</span>
    </a>
  );
}
