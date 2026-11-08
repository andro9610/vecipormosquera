import { useQueries } from "@tanstack/react-query";
import { fetchCounter } from "../services/countersService";

export const useCounters = (names: string[]) => {
  const results = useQueries({
    queries: names.map((name) => ({
      queryKey: ["counter", name],
      queryFn: () => fetchCounter(name),
      staleTime: 0,
      refetchOnMount: "always" as const,
    })),
  });

  const counters = names.reduce<Record<string, number>>((accumulator, name, index) => {
    accumulator[name] = results[index]?.data ?? 0;
    return accumulator;
  }, {});

  return { counters };
};
