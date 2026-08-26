export const useDateTools = () => {
    const formatDateToEsCo = (d: string | Date) => {
        const date = typeof d === "string" ? new Date(d) : d;
        try {
            return date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
        } catch {
            return date.toDateString();
        }
    }

    const isDateWithinTwoMonths = (date: string): boolean => {
        if (date.trim().length === 0) return false;

        const [day, month, year] = date.split("/").map(Number);
        if (!day || !month || !year) return false;

        const parsedDate = new Date(year, month - 1, day);
        const today = new Date();

        if (parsedDate > today) return false;
        
        const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
        return parsedDate > twoMonthsAgo;
    }

    const addMonthsToDate = (date: string, months: number): string => {
        if (date.trim().length === 0) return '';

        const [day, month, year] = date.split("/").map(Number);
        if (!day || !month || !year) return '';

        const result = new Date(year, month - 1 + months, day);
        const dayStr = String(result.getDate()).padStart(2, "0");
        const monthStr = String(result.getMonth() + 1).padStart(2, "0");

        return `${dayStr}/${monthStr}/${result.getFullYear()}`;
    }

    return { formatDateToEsCo, isDateWithinTwoMonths, addMonthsToDate };
}