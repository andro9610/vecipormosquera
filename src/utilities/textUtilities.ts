export const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

export type SupportCount = {
  count: number;
  singular: string;
  plural: string;
};

export const buildSupportsText = (supports: SupportCount[]) => {
  const parts = supports
    .filter((support) => support.count > 0)
    .map((support) => pluralize(support.count, support.singular, support.plural));

  return parts.length > 0 ? ` soportado en ${parts.join(" y ")}.` : ".";
};
