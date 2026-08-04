import { MaterialIcon } from "../../../fragments/MaterialIcon";
import { useNavigate } from "react-router-dom";

export const JoinUsBanner: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-base-100/50 p-4 rounded-2xl pt-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold">¿Quieres unirte a nuestro equipo?</h2>
                    <div className="mt-2 flex flex-col md:flex-row items-center gap-4">
                        <p className="text-base text-slate-700 flex-1">Estamos buscando personas apasionadas y comprometidas para unirse a nuestro equipo. Si estás interesado en hacer una diferencia en nuestro municipio, ¡queremos conocerte!</p>
                        <button className="px-6 py-2 btn btn-outline rounded-lg flex items-center" onClick={() => navigate("/volunteer")}>
                            <MaterialIcon icon="group_add" className="me-4" />Únete a nosotros</button>
                    </div>
                </div>
            </div>
        </div>
    );
}