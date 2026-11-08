import { incrementCounter } from "../../services/countersService";
import { queryClient } from "../../services/queryClient";
import { notify } from "../notificationUtilities";
import { documentStrategies, type DocumentDataMap, type DocumentKind, type TemplateGeneration } from "./strategies";
import { buildDocumentBlob, downloadBlob } from "./templateUtilities";

type GenerateDocumentOptions = {
  skipCounter?: boolean;
};

const buildFileName = (filePrefix: string) => {
  const dateTimeString = new Date()
    .toLocaleString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\//g, "-");

  return `${filePrefix}_${dateTimeString}.docx`;
};

export const generateDocument = async <K extends DocumentKind>(
  kind: K,
  data: DocumentDataMap[K],
  options: GenerateDocumentOptions = {},
) => {
  try {
    const strategy = documentStrategies[kind] as (state: DocumentDataMap[K]) => TemplateGeneration;
    const { templateUrl, filePrefix, replacementMaps } = strategy(data);
    const blob = await buildDocumentBlob(templateUrl, replacementMaps);

    downloadBlob(blob, buildFileName(filePrefix));

    if (!options.skipCounter) {
      try {
        await incrementCounter(filePrefix.toUpperCase());
        await queryClient.invalidateQueries({ queryKey: ["counter"] });
      } catch (counterError) {
        console.error("No se pudo actualizar el contador de documentos", counterError);
      }
    }

    notify("success", "Documento generado correctamente");
  } catch (error) {
    notify("error", "No se pudo generar el documento");
    throw error;
  }
};
