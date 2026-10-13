import { useState } from "react";

export const useConctactForm = () =>{

    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");

    // TODO: Recuperar el numero de contacto de la base de datos
    const sendWhatsApp = () => {
        const body = [mensaje.trim(), ` cordialmente ${nombre.trim()}`].join("\n").trim();
        const whatsappUrl = `https://wa.me/573193646699?text=${encodeURIComponent(body)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        return;
    }


    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendWhatsApp();
    };

    return {
        nombre, setNombre,
        mensaje, setMensaje,
        handleSubmit
    }
}
