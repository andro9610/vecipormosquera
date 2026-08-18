import { useEffect, useState, useCallback } from "react";
import { serviceUrl } from "../const/const";

type Suggestion = {
    alias: string;
    text: string;
};

export const useGetSuggestions = (form: string, section: string) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const getSuggestions = useCallback(async () => {
        const response = await fetch(`${serviceUrl}/suggestions/${form}/${section}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json() as { ALIAS: string; TEXT: string }[];
        setSuggestions(data.map((item) => ({
            alias: item.ALIAS,
            text: item.TEXT,
        })));
    }, [form, section]);

    useEffect(() => {
        getSuggestions();
    }, [getSuggestions]);

    return { suggestions };
};

