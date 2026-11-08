import { useQuery } from "@tanstack/react-query";
import { fetchSuggestions } from "../services/suggestionsService";

export const useGetSuggestions = (form: string, section: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["suggestions", form, section],
    queryFn: () => fetchSuggestions(form, section),
  });

  return { suggestions: data ?? [], isLoading, isError };
};
