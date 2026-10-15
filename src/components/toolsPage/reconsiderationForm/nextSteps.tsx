import { Note } from "../../../fragments/note/note";

export const NextSteps: React.FC = () => {
    return (
        <div className="space-y-4">
            <h4 className="font-semibold text-base-content">Terminos de respuesta</h4>

            <Note variant="warning">
                Generar el documento no lo radica automaticamente, este es un paso que debes hacer con tu
                secretaria de hacienda de manera presencial o mediante su correo electronico (Lo encontraras en
                el documento).
            </Note>

            <Note variant="info">
                A partir de la presentación del recurso la administración municipal tiene hasta un (1) año para
                responder a tu recurso.
            </Note>

            <Note variant="info">
                Si no responde, se entiende que hay "Silencio administrativo positivo". Esto quiere decir que si
                no hay respuesta deben acceder a tus peticiones en los terminos en los que lo propones.
            </Note>
        </div>
    );
};
