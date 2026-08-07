import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { useNavigate } from "react-router-dom";

export const PageInProgress: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-100vh text-center">
            <img
                src={`${import.meta.env.BASE_URL}logo_vector.svg`}
                alt="Logo"
                className="w-full max-w-[320px] h-100 grayscale"
            />
            <h1 className="text-4xl font-bold mb-4">Página en construcción</h1>
            <p className="text-lg text-gray-600">Estamos trabajando en esta página. ¡Vuelve pronto!</p>
            <button className="btn btn-outline my-8" onClick={() => navigate(-1)}><MaterialIcon icon="chevron_left" className="" />Volver</button>
        </div>
    );
}