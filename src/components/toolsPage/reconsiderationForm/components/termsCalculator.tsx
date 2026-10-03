import { useTermsCalculator } from "./termsCalculator/useTermsCalculator";

export type TermsCalculatorProps = {
    value: string;
    onChange: (value: string) => void;
}

export const TermsCalculator: React.FC<TermsCalculatorProps> = ({ value, onChange }) => {
    const { setInputEl } = useTermsCalculator(value, onChange);

    return (
        <div className="space-y-2">
            <h4>Fecha de expedición (la encuentras en tu recibo)</h4>
            <input
                ref={setInputEl}
                id="fechaExpedicion"
                name="fechaExpedicion"
                type="text"
                className="input input-bordered control-organic w-full"
                placeholder="Seleccione la fecha de expedición"
                autoComplete="off"
                aria-describedby="fechaExpedicionHint"
            />
            <p id="fechaExpedicionHint" className="text-sm text-base-content/70">
                El recurso solo puede presentarse dentro de los dos meses siguientes a la fecha de expedición.
            </p>
        </div>
    );
}