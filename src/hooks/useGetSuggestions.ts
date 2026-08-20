import { useQuery } from "@tanstack/react-query";
import { serviceUrl } from "../const/const";

export const useGetSuggestions = (form: string, section: string) => {
  const { data: suggestions } = useQuery({
    queryKey: ["suggestions", form, section],
    queryFn: async () => {
      const response = await fetch(`${serviceUrl}/suggestions/${form}/${section}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json() as { ALIAS: string; TEXT: string }[];
      return data.map((item) => ({ alias: item.ALIAS, text: item.TEXT }));
    },
  });
  return { suggestions: suggestions ?? [] };
};