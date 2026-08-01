import { useState } from "react";
import { MaterialIcon } from "../fragments/MaterialIcon";

const DESTINATARIO = "vecipormosquera@hotmail.com";

export const ContactUs = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Mensaje de contacto de ${nombre.trim()}`;
    const body = [`Nombre: ${nombre.trim()}`, `Correo: ${correo.trim()}`, "", mensaje.trim()].join("\n").trim();

    const mailtoUrl = `mailto:${DESTINATARIO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <>
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Hablemos</p>
        <p className="max-w-2xl text-sm md:text-base text-slate-700 leading-relaxed pb-5">
          ¿Un cafe para hablar? ¿Una propuesta interesante?. <br />
          Déjanos tus datos y tu mensaje. Nos pondremos en contacto contigo a la brevedad posible.
        </p>
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
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

        <label className="grid gap-2">
          <span className="label-text text-sm font-medium">Mensaje</span>
          <textarea
            className="textarea textarea-bordered control-organic min-h-40 w-full"
            name="mensaje"
            value={mensaje}
            onChange={(event) => setMensaje(event.target.value)}
            placeholder="Cuéntanos en qué podemos ayudarte"
            required
          />
        </label>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end pt-6">
          <button type="submit" className="btn btn-primary">
            <MaterialIcon icon="send" className="mr-2 text-base" />
            Enviar mensaje
          </button>
        </div>
      </form>
    </>
  );
};
