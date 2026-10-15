export type Suggestion = {
    alias: string;
    text: string;
};

type SuggestionsChipsProps = {
    suggestions: Suggestion[];
    onSelect: (value: string) => void;
    className?: string;
};

export const SuggestionsChips = ({ suggestions, onSelect, className }: SuggestionsChipsProps) => {
    return (
        <div className={`pointer-events-none absolute inset-0 flex flex-wrap content-center items-center gap-2 px-3 py-2 ${className ?? ""}`}>
            <span className="text-sm text-base-content/60">Sugerencias:</span>
            {suggestions.map((s, i) => (
                <button
                    key={i}
                    type="button"
                    className="pointer-events-auto btn btn-sm btn-outline btn-primary px-3 py-1 rounded-full"
                    onClick={() => onSelect(s.text)}
                >
                    {s.alias}
                </button>
            ))}
        </div>
    );
};

export default SuggestionsChips;
