import { useTermsCalculator } from "./termsCalculator/useTermsCalculator";
import "flatpickr/dist/flatpickr.min.css";

export type TermsCalculatorProps = {
    value: string;
    onChange: (value: string) => void;
}

export const TermsCalculator: React.FC<TermsCalculatorProps> = ({value, onChange}) => {    
    const { setInputEl} = useTermsCalculator(value, onChange);
    
    return (
        <>
            <h4>Fecha de expedición (la encuentas en tu recibo)</h4>
            <input
                ref={setInputEl}
                type="text"
                className="input input-bordered control-organic w-full"
                placeholder="Seleccione la fecha de expedición"
            />
        </>

    );
}