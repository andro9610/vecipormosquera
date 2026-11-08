import { Buffer } from "buffer";
import JSZip from "jszip";
import { formatWordText } from "../numberedListUtilities";

export type ReplacementMap = Map<string, string>;

type CreateReport = (options: {
  template: Uint8Array;
  data: Record<string, string>;
  noSandbox?: boolean;
}) => Promise<Uint8Array>;

const DOCX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

if (typeof globalThis.Buffer === "undefined") {
  (globalThis as typeof globalThis & { Buffer?: typeof Buffer }).Buffer = Buffer;
}

const buildTemplateData = (replacementMaps: ReplacementMap[]) => {
  const templateData: Record<string, string> = {};

  replacementMaps.forEach((replacementMap) => {
    replacementMap.forEach((value, marker) => {
      templateData[marker] = value;
    });
  });

  return templateData;
};

const replaceMarkers = async (archive: JSZip, replacementMaps: ReplacementMap[]) => {
  for (const entry of Object.values(archive.files)) {
    if (entry.dir) continue;

    const fileName = entry.name.toLowerCase();
    const isXmlLikeFile = fileName.endsWith(".xml") || fileName.endsWith(".rels") || fileName.endsWith(".vml");

    if (!isXmlLikeFile) continue;

    const originalContent = await entry.async("string");
    let updatedContent = originalContent;

    for (const replacementMap of replacementMaps) {
      for (const [marker, value] of replacementMap) {
        updatedContent = updatedContent.split(marker).join(formatWordText(value));
      }
    }

    if (updatedContent !== originalContent) archive.file(entry.name, updatedContent);
  }
};

const loadCreateReport = async (): Promise<CreateReport> => {
  const templateModule = await import("docx-templates/lib/browser.js");
  const createReport = (templateModule as { createReport?: CreateReport }).createReport;

  if (typeof createReport !== "function") {
    throw new Error("La libreria docx-templates no expone createReport en este entorno");
  }

  return createReport;
};

export const buildDocumentBlob = async (templateUrl: string, replacementMaps: ReplacementMap[]) => {
  const response = await fetch(templateUrl);

  if (!response.ok) throw new Error("No se pudo cargar la plantilla del documento");

  const archive = await JSZip.loadAsync(await response.arrayBuffer());
  await replaceMarkers(archive, replacementMaps);

  const templateBuffer = await archive.generateAsync({ type: "uint8array" });
  const createReport = await loadCreateReport();
  const reportBuffer = await createReport({
    template: templateBuffer,
    data: buildTemplateData(replacementMaps),
    noSandbox: true,
  });

  return new Blob([new Uint8Array(reportBuffer)], { type: DOCX_MIME_TYPE });
};

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
