import type { SortableTextItem } from "../types/sortableTextItem";

export const useTextAreaTools = () => {
    const createItem = (): SortableTextItem => ({ id: crypto.randomUUID(), value: '' });
    
    const reorderItems = <T extends { id: string }>(items: T[], activeId: string, overId: string): T[] => {
        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);
    
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
            return items;
        }
    
        const nextItems = [...items];
        const [movedItem] = nextItems.splice(oldIndex, 1);
        const targetIndex = oldIndex < newIndex ? newIndex - 1 : newIndex;
        nextItems.splice(targetIndex, 0, movedItem);
    
        return nextItems;
    };

    return {
        createItem,
        reorderItems,
    };
}