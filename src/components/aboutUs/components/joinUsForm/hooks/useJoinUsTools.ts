import { useState } from "react";

export const useJoinUsTools = () => {
    const [nombre, setNombre] = useState("");

    const sendWhatsApp = () => {
        const parts = [
            `Hola soy ${nombre.trim()} y estoy interesado en unirme a esta veeduria.`
        ].filter(Boolean).join("\n");

        const whatsappUrl = `https://wa.me/573193646699?text=${encodeURIComponent(parts)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendWhatsApp();
    };

    return {
        nombre,
        setNombre,
        handleSubmit
    };
}