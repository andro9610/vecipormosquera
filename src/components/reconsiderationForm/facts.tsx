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

type FactsProps = {
    facts: SortableTextItem[];
    onAdd: () => void;
    onUpdate: (id: string, value: string) => void;
    onRemove: (id: string) => void;
    onReorder: (activeId: string, overId: string) => void;
};

export const Facts = ({ facts, onAdd, onUpdate, onRemove, onReorder }: FactsProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
        useSensor(MouseSensor)
    );

    const handleDragEndFacts = (event: DragEndEvent) => {
        handleDragEnd(event, () => {
            onReorder(String(event.active.id), String(event.over?.id));
        });
    };

    return (
        <div className="space-y-3">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFacts}>
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
                <button className="btn btn-outline" type="button" onClick={onAdd}>
                    <MaterialIcon icon="list_alt_add" opticalSize={20} className="mr-1" aria-hidden="true" />
                    Agregar hecho
                </button>
            </div>
        </div>
    );
};
