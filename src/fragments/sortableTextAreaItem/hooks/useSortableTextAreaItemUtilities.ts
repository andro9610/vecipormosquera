import {
  MouseSensor,
  PointerSensor,
  TouchSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export const useSortableTextAreaItemUtilities = (onReorder: (activeId: string, overId: string) => void) => {
    const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(MouseSensor),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id)  return;
        onReorder(String(event.active.id), String(event.over?.id))
    };

    return {
        sensors,
        handleDragEnd
    }
}