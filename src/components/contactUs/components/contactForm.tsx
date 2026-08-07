import { useState } from "react";
import { MaterialIcon } from "../../../fragments/materialIcon/MaterialIcon";

const DESTINATARIO = "vecipormosquera@hotmail.com";

export const ContactForm = () => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [medioEnvio, setMedioEnvio] = useState<"correo" | "whatsapp">("whatsapp");

    const sendMail = () => {
        const subject = `Mensaje de contacto de ${nombre.trim()}`;
        const body = [`Nombre: ${nombre.trim()}`, `Correo: ${correo.trim()}`, "", mensaje.trim()].join("\n").trim();

        const mailtoUrl = `mailto:${DESTINATARIO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;
    }

    const sendWhatsApp = () => {
        const body = [mensaje.trim(), ` cordialmente ${nombre.trim()}`].join("\n").trim();
        const whatsappUrl = `https://wa.me/573193646699?text=${encodeURIComponent(body)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        return;
    }


    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        medioEnvio === "whatsapp" ? sendWhatsApp() : sendMail();


    };

    return (
        <>
            <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Hablemos</p>
                <p className="max-w-2xl text-sm md:text-base text-slate-700 leading-relaxed pb-5">
                    ¿Un cafe para hablar? ¿Una propuesta interesante?.
                    Déjanos tus datos y tu mensaje. Nos pondremos en contacto contigo.
                </p>
            </div>

            <form className="grid gap-5" onSubmit={handleSubmit}>
                <span className="label-text text-sm font-medium">Enviar por</span>
                <div className="flex w-full items-start gap-3 flex-wrap sm:flex-nowrap">
                    <label className="custom-option flex sm:w-1/2 flex-row items-start gap-3">
                        <input
                            type="radio"
                            name="medioEnvio"
                            className="radio radio-primary"
                            checked={medioEnvio === "correo"}
                            onChange={() => setMedioEnvio("correo")}
                        />
                        <span className="text-base font-medium">Correo</span>
                    </label>
                    <label className="custom-option flex sm:w-1/2 flex-row items-start gap-3">
                        <input
                            type="radio"
                            name="medioEnvio"
                            className="radio radio-primary"
                            checked={medioEnvio === "whatsapp"}
                            onChange={() => setMedioEnvio("whatsapp")}
                        />
                        <span className="text-base font-medium">WhatsApp</span>
                    </label>
                </div>
                {
                    medioEnvio === "correo" && <>
                        <label className="grid gap-2">
                            <span className="label-text text-sm font-medium">Correo</span>
                            <input
                                className="input input-bordered control-organic w-full"
                                type="email"
                                name="correo"
                                value={correo}
                                onChange={(event) => setCorreo(event.target.value)}
                                placeholder="tu@correo.com"
                                required
                            />
                        </label>
                    </>
                }

                <label className="grid gap-2">
                    <span className="label-text text-sm font-medium">Nombre</span>
                    <input
                        className="input input-bordered control-organic w-full"
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        placeholder="Tu nombre completo"
                        required
                    />
                </label>
                <label className="grid gap-2">
                    <span className="label-text text-sm font-medium">Mensaje</span>
                    <textarea
                        className="textarea textarea-bordered control-organic min-h-40 w-full"
                        name="mensaje"
                        value={mensaje}
                        onChange={(event) => setMensaje(event.target.value)}
                        placeholder="¿Porque quieres contactarnos?"
                        required
                    />
                </label>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end pt-6">
                    <button type="submit" className="btn btn-primary">
                        <MaterialIcon icon="send" className="mr-2 text-base" />
                        Enviar
                    </button>
                </div>
            </form>
        </>
    );
}