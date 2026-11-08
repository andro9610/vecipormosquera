import { useState } from "react";
import { WHATSAPP_NUMBER } from "../../../../../const/const";
import { openWhatsApp } from "../../../../../utilities/whatsappUtilities";

export const useJoinUsTools = () => {
    const [nombre, setNombre] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        openWhatsApp(WHATSAPP_NUMBER, `Hola soy ${nombre.trim()} y estoy interesado en unirme a esta veeduria.`);
    };

    return { nombre, setNombre, handleSubmit };
};
