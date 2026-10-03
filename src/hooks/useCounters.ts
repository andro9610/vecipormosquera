import { useQueries } from "@tanstack/react-query";
import { serviceUrl } from "../const/const";

const isNumericString = (value: string) =>
  value.trim() !== "" && Number.isFinite(Number(value));

const extractCounterValue = (payload: unknown): number => {
  if (payload === null || payload === undefined) return 0;

  if (typeof payload === "number") return payload;

  if (typeof payload === "string") {
    return isNumericString(payload) ? Number(payload) : 0;
  }

  if (Array.isArray(payload)) {
    return payload.length > 0 ? extractCounterValue(payload[0]) : 0;
  }

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const preferredKeys = [
      "VALUE",
      "value",
      "COUNTER_VALUE",
      "COUNT",
      "count",
      "TOTAL",
      "total",
      "CANTIDAD",
      "cantidad",
      "CONTADOR",
      "contador",
      "COUNTER",
      "counter",
    ];

    for (const key of preferredKeys) {
      if (key in record && record[key] !== null && record[key] !== undefined) {
        return extractCounterValue(record[key]);
      }
    }

    for (const value of Object.values(record)) {
      if (typeof value === "number") return value;
      if (typeof value === "string" && isNumericString(value)) return Number(value);
    }
  }

  return 0;
};

const fetchCounter = async (name: string): Promise<number> => {
  const response = await fetch(`${serviceUrl}/counters/${name}`);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al consultar el counter ${name}`);
  }

  return extractCounterValue(await response.json());
};

export const useCounters = (names: string[]) => {
  const results = useQueries({
    queries: names.map((name) => ({
      queryKey: ["counter", name],
      queryFn: () => fetchCounter(name),
      staleTime: 60 * 1000,
    })),
  });

  const counters = names.reduce<Record<string, number>>((acc, name, index) => {
    acc[name] = results[index]?.data ?? 0;
    return acc;
  }, {});

  return { counters };
};
