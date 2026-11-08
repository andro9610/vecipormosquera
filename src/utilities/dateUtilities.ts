export const formatDateToEsCo = (value: string | Date) => {
  const date = typeof value === "string" ? new Date(value) : value;

  try {
    return date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return date.toDateString();
  }
};

const parseDayMonthYear = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day);
};

export const isDateWithinTwoMonths = (date: string): boolean => {
  const parsedDate = parseDayMonthYear(date);
  if (!parsedDate) return false;

  const today = new Date();
  if (parsedDate > today) return false;

  const limitDate = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
  limitDate.setDate(limitDate.getDate() - 1);

  return parsedDate > limitDate;
};

export const addMonthsToDate = (date: string, months: number): string => {
  const parsedDate = parseDayMonthYear(date);
  if (!parsedDate) return "";

  const result = new Date(parsedDate.getFullYear(), parsedDate.getMonth() + months, parsedDate.getDate());
  const day = String(result.getDate()).padStart(2, "0");
  const month = String(result.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}/${result.getFullYear()}`;
};
