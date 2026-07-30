import {
    DndContext,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    closestCenter,
    type DragEndEvent,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { SortableTextItem } from '../../types/sortableTextItem';
import { MaterialIcon } from '../../fragments/MaterialIcon';
import { SortableTextareaItem, handleDragEnd } from '../../fragments/sortableTextAreaItem';

type RequirementsProps = {
    requirements: SortableTextItem[];
    onAdd: () => void;
    onUpdate: (id: string, value: string) => void;
    onRemove: (id: string) => void;
    onReorder: (activeId: string, overId: string) => void;
};

export const Requirements = ({
    requirements,
    onAdd,
    onUpdate,
    onRemove,
    onReorder,
}: RequirementsProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
        useSensor(MouseSensor)
    );

    const handleDragEndRequirements = (event: DragEndEvent) => {
        handleDragEnd(event, () => {
            onReorder(String(event.active.id), String(event.over?.id));
        });
    };

    return (
        <div className="space-y-3">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndRequirements}>
                <SortableContext items={requirements.map((requirement) => requirement.id)} strategy={verticalListSortingStrategy}>
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
                    <MaterialIcon icon="add" opticalSize={20} className="mr-1" aria-hidden="true" />
                    Agregar peticion
                </button>
            </div>
        </div>
    );
};
