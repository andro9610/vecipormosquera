type suggestion = {
    alias: string;
    text: string;
}

type SuggestionsChipsProps = {
    suggestions: suggestion[];
    onSelect: (value: string) => void;
    className?: string;
};

export const SuggestionsChips = ({ suggestions, onSelect, className }: SuggestionsChipsProps) => {
    return (
        <div className={className}>
            <div className="text-sm text-gray-500 mb-2 dark:text-base-content/50">¿No sabes que escribir? Para empezar te brindamos algunas sugerencias</div>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                    <button
                        key={i}
                        type="button"
                        className="btn btn-sm btn-outline btn-primary px-3 py-1 rounded-full"
                        onClick={() => onSelect(s.text)}
                    >
                        {s.alias}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SuggestionsChips;
