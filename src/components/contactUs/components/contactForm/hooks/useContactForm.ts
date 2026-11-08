import { useState } from "react";
import { WHATSAPP_NUMBER } from "../../../../../const/const";
import { openWhatsApp } from "../../../../../utilities/whatsappUtilities";

export const useContactForm = () => {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        openWhatsApp(WHATSAPP_NUMBER, [mensaje.trim(), ` cordialmente ${nombre.trim()}`].join("\n").trim());
    };

    return { nombre, setNombre, mensaje, setMensaje, handleSubmit };
};
