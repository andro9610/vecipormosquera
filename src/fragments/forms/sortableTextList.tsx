import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { SortableTextItem } from "../../types/sortableTextItem";
import { MaterialIcon } from "../materialIcon/MaterialIcon";
import { SortableTextareaItem } from "../sortableTextAreaItem/sortableTextAreaItem";
import { useSortableTextAreaItemUtilities } from "../sortableTextAreaItem/hooks/useSortableTextAreaItemUtilities";
import { useGetSuggestions } from "../../hooks/useGetSuggestions";

type SortableTextListProps = {
  items: SortableTextItem[];
  suggestionForm: string;
  suggestionSection: string;
  placeholder: string;
  addLabel: string;
  onAdd: (initialValue?: string) => void;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
};

export const SortableTextList = ({
  items,
  suggestionForm,
  suggestionSection,
  placeholder,
  addLabel,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
}: SortableTextListProps) => {
  const { sensors, handleDragEnd } = useSortableTextAreaItemUtilities(onReorder);
  const {
    suggestions,
    isLoading: suggestionsLoading,
    isError: suggestionsError,
  } = useGetSuggestions(suggestionForm, suggestionSection);

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableTextareaItem
              key={item.id}
              id={item.id}
              value={item.value}
              placeholder={placeholder}
              onChange={onUpdate}
              onRemove={onRemove}
              suggestions={suggestions}
              suggestionsLoading={suggestionsLoading}
              suggestionsError={suggestionsError}
              onSelectSuggestion={(text) => onUpdate(item.id, text)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className="flex justify-center">
        <button className="btn btn-outline" type="button" onClick={() => onAdd()}>
          <MaterialIcon icon="list_alt_add" opticalSize={20} className="mr-1" aria-hidden="true" />
          {addLabel}
        </button>
      </div>
    </div>
  );
};
