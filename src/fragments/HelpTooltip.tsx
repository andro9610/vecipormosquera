import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type HelpTooltipProps = { text: string };

export const HelpTooltip = ({ text }: HelpTooltipProps) => {
    return (
        <OverlayTrigger
            placement="right"
            overlay={<Tooltip id={`tooltip-${text.replace(/\s+/g, '-').toLowerCase()}`}>{text}</Tooltip>}
        >
            <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle border border-secondary-subtle text-secondary ms-2"
                style={{ width: '1.25rem', height: '1.25rem', fontSize: '0.78rem', cursor: 'help' }}
            >
                ?
            </span>
        </OverlayTrigger>
    );
}
