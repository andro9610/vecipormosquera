import SuggestionsChips from "../suggestionsChips/suggestionsChips";
import { useGetSuggestions } from "../../hooks/useGetSuggestions";

type PreviousActFieldProps = {
  value: string;
  onChange: (value: string) => void;
  suggestionForm: string;
};

export const PreviousActField = ({ value, onChange, suggestionForm }: PreviousActFieldProps) => {
  const { suggestions, isLoading, isError } = useGetSuggestions(suggestionForm, "ACTUACION_PREVIA");
  const showSuggestions = (isLoading || suggestions.length > 0) && !isError && value.trim().length === 0;

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
          isLoading={isLoading}
          isError={isError}
          onSelect={(text) => onChange(text)}
        />
      )}
    </div>
  );
};
