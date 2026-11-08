export const isFilled = (value: unknown) => String(value ?? "").trim().length > 0;

export const areFieldsFilled = <T extends object>(value: T, fields: Array<keyof T>) =>
  fields.every((field) => isFilled(value[field]));

export const hasFilledItems = (items: Array<{ value: string }>) =>
  items.some((item) => isFilled(item.value));
