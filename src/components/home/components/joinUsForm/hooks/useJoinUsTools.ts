import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { serviceUrl } from "../../../../../const/const";

interface WhatsAppData {
    alias: string;
    text: string;
}

export const useJoinUsTools = () => {
    const [nombre, setNombre] = useState("");

    const { data: whatsappNumber } = useQuery({
        queryKey: ["data", "WHATSAPP_NUMBER"],
        queryFn: async () => {
            const response = await fetch(`${serviceUrl}/data/WHATSAPP_NUMBER`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const data = await response.json() as { ALIAS: string; TEXT: string }[];
            return data.map((item): WhatsAppData => ({ alias: item.ALIAS, text: item.TEXT }));
        },
        select: (data) => {
            const item = data.find((entry) => entry.alias === "WHATSAPP_NUMBER") ?? data[0];
            return item ? item.text.replace(/[^\d]/g, "") : "";
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!whatsappNumber) {
            console.error("No se pudo obtener el número de WhatsApp.");
            return;
        }

        const parts = [
            `Hola soy ${nombre.trim()} y estoy interesado en unirme a esta veeduria.`
        ].filter(Boolean).join("\n");

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(parts)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };

    return {
        nombre,
        setNombre,
        handleSubmit
    };
}