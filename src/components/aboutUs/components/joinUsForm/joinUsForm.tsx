
import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import { useJoinUsTools } from "./hooks/useJoinUsTools";

export const JoinUsForm: React.FC = () => {
    const { nombre, setNombre, handleSubmit } = useJoinUsTools();

    return (
        <>
            <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Únete</p>
                <p className="max-w-2xl text-sm md:text-base text-slate-700 leading-relaxed pb-5">
                    ¿Quieres ser parte de esta veeduria? Déjanos tu nombre y te contactaremos por WhatsApp.
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
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Tu nombre completo"
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