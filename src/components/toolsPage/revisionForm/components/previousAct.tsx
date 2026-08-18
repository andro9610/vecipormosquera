import SuggestionsChips from '../../../../fragments/suggestionsChips/suggestionsChips';
import { useGetSuggestions } from '../../../../hooks/useGetSuggestions';

type PreviousActProps = {
    value: string;
    onChange: (value: string) => void;
};

export const PreviousAct = ({ value, onChange }: PreviousActProps) => {
    const { suggestions } = useGetSuggestions('SOLICITUD_REVISION', 'ACTUACION_PREVIA');

    return (
        <>
            <div>
                { suggestions.length > 0 &&
                    <SuggestionsChips
                    className="mb-2"
                    suggestions={suggestions}
                    onSelect={(t) => onChange(t)}
                    />
                }
                <input
                    id="actuacionPrevia"
                    type="text"
                    className="input input-bordered control-organic w-full"
                    placeholder="Ej: Impuesto predial XXXX para el año 2026"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
        </>
    );
};
