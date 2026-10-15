import SuggestionsChips from '../../../../fragments/suggestionsChips/suggestionsChips';
import { useGetSuggestions } from '../../../../hooks/useGetSuggestions';

type PreviousActProps = {
    value: string;
    onChange: (value: string) => void;
};

export const PreviousAct = ({ value, onChange }: PreviousActProps) => {
    const { suggestions } = useGetSuggestions('SOLICITUD_REVISION', 'ACTUACION_PREVIA');
    const showSuggestions = suggestions.length > 0 && value.trim().length === 0;

    return (
        <div className="relative">
            <input
                id="actuacionPrevia"
                type="text"
                className="input input-bordered control-organic w-full"
                placeholder={showSuggestions ? "" : "Ej: Impuesto predial XXXX para el año 2026"}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
            {showSuggestions && (
                <SuggestionsChips
                    suggestions={suggestions}
                    onSelect={(t) => onChange(t)}
                />
            )}
        </div>
    );
};
