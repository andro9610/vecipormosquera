export const useDateTools = () => {
    const formatDateToEsCo = (d: string | Date) => {
        const date = typeof d === "string" ? new Date(d) : d;
        try {
            return date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
        } catch {
            return date.toDateString();
        }
    }

    return { formatDateToEsCo };
}