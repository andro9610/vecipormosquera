export const sanitizePhone = (value: string) => value.replace(/[^\d]/g, "");

export const openWhatsApp = (phone: string, message: string) => {
  const url = `https://wa.me/${sanitizePhone(phone)}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};
