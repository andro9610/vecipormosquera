import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { SortableTextItem } from "../../../../types/sortableTextItem";
import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import { SortableTextareaItem } from "../../../../fragments/sortableTextAreaItem/sortableTextAreaItem";
import { useSortableTextAreaItemUtilities } from "../../../../fragments/sortableTextAreaItem/hooks/useSortableTextAreaItemUtilities";
import SuggestionsChips from '../../../../fragments/suggestionsChips/suggestionsChips';
import { useGetSuggestions } from "../../../../hooks/useGetSuggestions";

type FactsProps = {
  facts: SortableTextItem[];
  onAdd: (initialValue?: string) => void;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
};

export const Facts = ({ facts, onAdd, onUpdate, onRemove, onReorder }: FactsProps) => {
  const { sensors, handleDragEnd } = useSortableTextAreaItemUtilities(onReorder);
  const { suggestions } = useGetSuggestions('SOLICITUD_REVISION', 'HECHOS');

  return (
    <div className="space-y-3">
      { suggestions.length > 0 &&
        <SuggestionsChips
          className="mb-2"
          suggestions={suggestions}
          onSelect={(t) => {
            const emptyFact = facts.find((fact) => fact.value.trim().length === 0);
            if (emptyFact) {
              onUpdate(emptyFact.id, t);
            } else {
              onAdd(t);
            }
          }}
        />
      }
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={facts.map((fact) => fact.id)} strategy={verticalListSortingStrategy}>
          {facts.map((fact) => (
            <SortableTextareaItem
              key={fact.id}
              id={fact.id}
              value={fact.value}
              placeholder="Descripcion del hecho"
              onChange={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className="flex justify-center">
        <button className="btn btn-outline" type="button" onClick={() => onAdd()}>
          <MaterialIcon icon="list_alt_add" opticalSize={20} className="mr-1" aria-hidden="true" />
          Agregar hecho
        </button>
      </div>
    </div>
  );
};

