import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { SortableTextItem } from "../../../types/sortableTextItem";
import { MaterialIcon } from "../../../fragments/MaterialIcon";
import { SortableTextareaItem } from "../../../fragments/sortableTextAreaItem/sortableTextAreaItem";
import { useSortableTextAreaItemUtilities } from "../../../fragments/sortableTextAreaItem/hooks/useSortableTextAreaItemUtilities";

type RequirementsProps = {
  requirements: SortableTextItem[];
  onAdd: () => void;
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
};

export const Requirements = ({ requirements, onAdd, onUpdate, onRemove, onReorder }: RequirementsProps) => {
  const { sensors, handleDragEnd } = useSortableTextAreaItemUtilities(onReorder);

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={requirements.map((requirement) => requirement.id)}
          strategy={verticalListSortingStrategy}>
          {requirements.map((requirement) => (
            <SortableTextareaItem
              key={requirement.id}
              id={requirement.id}
              value={requirement.value}
              placeholder="Descripcion de la peticion"
              onChange={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className="flex justify-center">
        <button className="btn btn-outline" type="button" onClick={onAdd}>
          <MaterialIcon icon="list_alt_add" opticalSize={20} className="mr-1" aria-hidden="true" />
          Agregar peticion
        </button>
      </div>
    </div>
  );
};
