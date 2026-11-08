import { useEffect, useEffectEvent, useState } from "react";
import flatpickr from "flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import { isDateWithinTwoMonths } from "../../../../../utilities/dateUtilities";
import { notify } from "../../../../../utilities/notificationUtilities";

export const useTermsCalculator = (value: string, onChange: (value: string) => void) => {
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
            notify({ type: "warn", message: "Ya no es posible presentar este recurso" });
        }
    }, [value]);

    return { setInputEl };
};
