import flatpickr from "flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect, useEffectEvent, useState } from "react";
import { useDateTools } from "../../../../hooks/useDateTools";
import { useToastNotification } from "../../../../hooks/useToastNotification";

export type TermsCalculatorProps = {
    value: string;
    onChange: (value: string) => void;
}

export const TermsCalculator: React.FC<TermsCalculatorProps> = ({value, onChange}) => {
    const { isDateWithinTwoMonths } = useDateTools();
    const { notify } = useToastNotification();
    const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
    const [picker, setPicker] = useState<flatpickr.Instance | null>(null);

    const onDateChange = useEffectEvent((dateStr: string) => {
        onChange(dateStr);
    });

    useEffect(() => {
        if (!inputEl) return;

        const instance = flatpickr(inputEl, {
            dateFormat: "d/m/Y",
            locale: Spanish,
            onChange: (_selectedDates, dateStr) => {
                onDateChange(dateStr);
            },
        });

        setPicker(instance);

        return () => {
            instance.destroy();
        };
    }, [inputEl]);

    useEffect(() => {
        picker?.setDate(value || "", false);
    }, [picker, value]);

    useEffect(() => {
        if (value.trim().length > 0 && !isDateWithinTwoMonths(value)) {
            notify({ type: 'warn', message: 'Ya no es posible presentar este recurso' });
        }
    }, [value]);
    
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