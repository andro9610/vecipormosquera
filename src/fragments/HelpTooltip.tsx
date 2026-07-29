type HelpTooltipProps = { text: string };

export const HelpTooltip = ({ text }: HelpTooltipProps) => {
    return (
        <span className="tooltip [--placement:right] [--trigger:hover]">
            <span
                className="tooltip-toggle inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-base-300 text-xs font-bold text-base-content/70"
                aria-label="Mostrar ayuda"
                role="img"
                tabIndex={0}
            >
                ?
            </span>
            <span className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible invisible z-50 opacity-0" role="tooltip">
                <span className="tooltip-body tooltip-primary max-w-xs whitespace-normal break-words text-left text-xs leading-snug">
                    {text}
                </span>
            </span>
        </span>
    );
}
