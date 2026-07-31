type PreviousActProps = {
    value: string;
    onChange: (value: string) => void;
};

export const PreviousAct = ({ value, onChange }: PreviousActProps) => {
    return (
        <div className="space-y-2">
            <input
                id="actuacionPrevia"
                type="text"
                className="input input-bordered control-organic w-full"
                placeholder="Ej: Impuesto predial XXXX para el año 2026"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    );
};
