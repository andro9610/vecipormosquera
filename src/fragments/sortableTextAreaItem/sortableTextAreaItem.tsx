import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { DragEndEvent } from "@dnd-kit/core";
import { MaterialIcon } from "../materialIcon/MaterialIcon";
import SuggestionsChips, { type Suggestion } from "../suggestionsChips/suggestionsChips";

type SortableTextareaItemProps = {
  id: string;
  value: string;
  placeholder: string;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  suggestions?: Suggestion[];
  onSelectSuggestion?: (value: string) => void;
  suggestionsLoading?: boolean;
  suggestionsError?: boolean;
};

//TODO: Llevar funcion a donde corresponde
export const handleDragEnd = (event: DragEndEvent, fun: Function) => {
  const { active, over } = event;

  if (!over || active.id === over.id) {
    return;
  }

  fun?.();
};

export const SortableTextareaItem = ({
  id,
  value,
  placeholder,
  onChange,
  onRemove,
  suggestions,
  onSelectSuggestion,
  suggestionsLoading,
  suggestionsError,
}: SortableTextareaItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.82 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none",
  };

  const showSuggestions =
    value.trim().length === 0 && !suggestionsError && (suggestionsLoading || (suggestions?.length ?? 0) > 0);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`surface-panel mb-3 flex items-start gap-3 p-4 transition-all ${isDragging ? "border-primary ring-2 ring-primary/20 shadow-lg" : ""}`}>
      <div className="relative w-full">
        <textarea
          rows={4}
          value={value}
          onChange={(event) => onChange(id, event.target.value)}
          placeholder={showSuggestions ? "" : placeholder}
          className="textarea textarea-ghost control-organic w-full resize-y bg-transparent"
          style={{ minHeight: "4.5rem" }}
        />
        {showSuggestions && onSelectSuggestion && (
          <SuggestionsChips
            suggestions={suggestions ?? []}
            isLoading={suggestionsLoading}
            isError={suggestionsError}
            onSelect={onSelectSuggestion}
          />
        )}
      </div>
      <div className="flex min-w-14 flex-col gap-2">
        <button
          type="button"
          className="btn btn-outline btn-danger btn-square"
          style={{ width: "3rem", height: "3rem" }}
          onClick={() => onRemove(id)}
          aria-label="Eliminar elemento">
          <MaterialIcon icon="close" opticalSize={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="btn btn-outline btn-primary btn-square"
          style={{ width: "3rem", height: "3rem", userSelect: "none", touchAction: "none" }}
          {...attributes}
          {...listeners}
          aria-label="Mover elemento">
          <MaterialIcon icon="drag_indicator" opticalSize={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
