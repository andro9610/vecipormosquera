import type { SortableTextItem } from "../types/sortableTextItem";

export const createItem = (): SortableTextItem => ({ id: crypto.randomUUID(), value: "" });

export const createItemWithValue = (value = ""): SortableTextItem => ({ id: crypto.randomUUID(), value });

export const reorderItems = <T extends { id: string }>(items: T[], activeId: string, overId: string): T[] => {
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === overId);

  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return items;

  const nextItems = [...items];
  const [movedItem] = nextItems.splice(oldIndex, 1);
  nextItems.splice(oldIndex < newIndex ? newIndex - 1 : newIndex, 0, movedItem);

  return nextItems;
};

export const addItem = <T>(items: T[], item: T): T[] => [...items, item];

export const updateItemValue = (items: SortableTextItem[], payload: { id: string; value: string }) =>
  items.map((item) => (item.id === payload.id ? { ...item, value: payload.value } : item));

export const removeItem = (items: SortableTextItem[], id: string) =>
  items.length > 1
    ? items.filter((item) => item.id !== id)
    : items.map((item) => (item.id === id ? { ...item, value: "" } : item));

export const updateField = <T extends object>(value: T, field: keyof T, fieldValue: T[keyof T]): T => ({
  ...value,
  [field]: fieldValue,
});
