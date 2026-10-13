import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import { useConctactForm } from "./hooks/useContactForm";

export const ContactForm = () => {
    const {
        nombre, setNombre,
        mensaje, setMensaje,
        handleSubmit
    } = useConctactForm();

    return (
        <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg">Envíanos un mensaje</h3>
                <p className="text-sm text-base-content/70">
                    Déjanos tus datos y tu mensaje. Nos pondremos en contacto contigo.
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
                    <span className="label-text text-sm font-medium">Mensaje</span>
                    <textarea
                        className="textarea textarea-bordered control-organic min-h-40 w-full"
                        name="mensaje"
                        value={mensaje}
                        onChange={(event) => setMensaje(event.target.value)}
                        placeholder="¿Por qué quieres contactarnos?"
                        required
                    />
                </label>

                <div className="flex flex-col gap-3 pt-2">
                    <span className="flex items-center gap-2 text-xs text-base-content/60">
                        <MaterialIcon icon="chat" className="text-base text-primary" />
                        Se enviará por WhatsApp
                    </span>
                    <button type="submit" className="btn btn-primary w-full">
                        <MaterialIcon icon="send" className="mr-2 text-base" />
                        Enviar
                    </button>
                </div>
            </form>
        </section>
    );
};
