import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";

type TimelineFilterProps = {
    tags: string[];
    selectedTag: string | null;
    onChange: (tag: string | null) => void;
};

export const TimelineFilter: React.FC<TimelineFilterProps> = ({ tags, selectedTag, onChange }) => {
    return (
        <div className="filters-section">
            <div className="filter flex flex-wrap gap-2 items-center">
                {selectedTag !== null && (
                    <button
                        type="button"
                        className="chip rounded-full px-3 py-1 text-sm flex items-center gap-2 bg-base-200 hover:bg-base-300 border border-base-300"
                        onClick={() => onChange(null)}
                        aria-label="Limpiar filtro"
                    >
                        <MaterialIcon icon="filter_alt_off" className="text-sm" />
                    </button>
                )}
                {tags.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        className={`chip rounded-full px-3 py-1 text-sm select-none transition-colors duration-150 border ${selectedTag === tag
                            ? 'bg-secondary border-secondary shadow'
                            : 'bg-base-200 text-base-content border-base-300 hover:bg-base-300'
                            }`}
                        onClick={() => onChange(tag)}
                        aria-pressed={selectedTag === tag}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};