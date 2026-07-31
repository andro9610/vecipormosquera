import { Buffer } from 'buffer';
import JSZip from 'jszip';
import revisionTemplateUrl from '../docs/Solicitud_Revision.docx?url';
import reconsiderationTemplateUrl from '../docs/Recurso_Reconsideracion.docx?url';
import type { RequirementsState } from '../reducers/requirementsReducer';
import type { ReconsiderationState } from '../reducers/reconsiderationReducer';
import { formatNumberedList, formatWordText } from './formatNumberedList';

type ReplacementInput = Map<string, string> | Map<string, string>[];

type TemplateGenerationOptions = {
    templateUrl: string;
    replacementMaps: ReplacementInput;
    filePrefix: string;
};

type DocumentKind = 'revision' | 'reconsideracion';
type DocumentData = RequirementsState | ReconsiderationState;

if (typeof globalThis.Buffer === 'undefined') {
    (globalThis as typeof globalThis & { Buffer?: typeof Buffer }).Buffer = Buffer;
}

const normalizeReplacementMaps = (replacementMaps: ReplacementInput): Map<string, string>[] => {
    return Array.isArray(replacementMaps) ? replacementMaps : [replacementMaps];
};

const getTemplateDataFromMaps = (replacementMaps: Map<string, string>[]) => {
    const templateData: Record<string, string> = {};

    for (const replacementMap of replacementMaps) {
        for (const [marker, value] of replacementMap) {
            templateData[marker] = value;
        }
    }

    return templateData;
};

const replaceExactMarkersInArchive = async (
    archive: JSZip,
    replacementMaps: Map<string, string>[]
) => {
    for (const entry of Object.values(archive.files)) {
        if (entry.dir) {
            continue;
        }

        const fileName = entry.name.toLowerCase();
        const isXmlLikeFile = fileName.endsWith('.xml') || fileName.endsWith('.rels') || fileName.endsWith('.vml');

        if (!isXmlLikeFile) {
            continue;
        }

        const originalContent = await entry.async('string');
        let updatedContent = originalContent;

        for (const replacementMap of replacementMaps) {
            for (const [marker, value] of replacementMap) {
                const escapedValue = formatWordText(value);
                updatedContent = updatedContent.split(marker).join(escapedValue);
            }
        }

        if (updatedContent !== originalContent) {
            archive.file(entry.name, updatedContent);
        }
    }
};

const buildCommonReplacements = (data: DocumentData): Map<string, string> => {
    return new Map<string, string>([
        ['Nombre_Solicitante', data.solicitante.nombre?.trim() ?? ''],
        ['Genero_Verbo', data.solicitante.tratamiento?.trim() === 'Sr' ? 'o' : 'a'],
        ['Cedula_Solicitante', data.solicitante.cedula?.trim() ?? ''],
        ['Direccion_Solicitante', data.solicitante.direccion?.trim() ?? ''],
        ['Celular_Solicitante', data.solicitante.celular?.trim() ?? ''],
        ['Correo_Solicitante', data.solicitante.correo?.trim() ?? ''],
        ['Actuacion_Previa', data.actuacionPrevia?.trim() ? `Referencia. ${data.actuacionPrevia.trim()}` : ''],
        ['Peticiones_Solicitud', formatNumberedList(data.peticiones)],
        ['Hechos_Solicitud', formatNumberedList(data.hechos)],
    ]);
};

const buildReconsiderationReplacements = (data: DocumentData): Map<string, string> => {
    const attachmentList = formatNumberedList(data.anexos.map((name) => ({ value: name })));

    return new Map<string, string>([
        ['Actuacion_Previa', data.actuacionPrevia?.trim() ? `Referencia. ${data.actuacionPrevia.trim()}` : ''],
        ['Nombre_Solicitante', data.solicitante.nombre?.trim() ?? ''],
        ['Genero_Verbo', data.solicitante.tratamiento?.trim() === 'Sr' ? 'o' : 'a'],
        ['Cedula_Solicitante', data.solicitante.cedula?.trim() ?? ''],
        ['Identificador_Inmueble', data.solicitante.identificador?.trim() ?? ''],
        ['Numero_Identificacion_Inmueble', data.solicitante.numeroIdentificacion?.trim() ?? ''],
        ['Direccion_Solicitante', data.solicitante.direccion?.trim() ?? ''],
        ['Fundamentos_Hecho_Derecho', formatNumberedList(data.hechos)],
        ['Anexos_Solicitud', attachmentList],
        ['Correo_Solicitante', data.solicitante.correo?.trim() ?? ''],
        ['Celular_Solicitante', data.solicitante.celular?.trim() ?? ''],
    ]);
};

export const useDocumentTools = () => {
    const generateDocumentFromTemplate = async ({
        templateUrl,
        replacementMaps,
        filePrefix,
    }: TemplateGenerationOptions) => {
        const response = await fetch(templateUrl);

        if (!response.ok) throw new Error('No se pudo cargar la plantilla del documento');
        
        const arrayBuffer = await response.arrayBuffer();
        const archive = await JSZip.loadAsync(arrayBuffer);
        const normalizedMaps = normalizeReplacementMaps(replacementMaps);

        await replaceExactMarkersInArchive(archive, normalizedMaps);

        const templateData = getTemplateDataFromMaps(normalizedMaps);

        const templateBuffer = await archive.generateAsync({ type: 'uint8array' });
        const docxTemplateModule = await import('docx-templates/lib/browser.js');
        const createReport = (docxTemplateModule as {
            createReport?: (options: {
                template: Uint8Array;
                data: Record<string, string>;
                noSandbox?: boolean;
            }) => Promise<Uint8Array>;
        }).createReport;

        if (typeof createReport !== 'function') {
            throw new Error('La libreria docx-templates no expone createReport en este entorno');
        }

        const reportBuffer = await createReport({
            template: templateBuffer,
            data: templateData,
            noSandbox: true,
        });

        const reportBytes = new Uint8Array(reportBuffer);
        const blob = new Blob([reportBytes], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        const now = new Date();
        const dateTimeString = now.toLocaleString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).replace(/\//g, '-');

        link.download = `${filePrefix}_${dateTimeString}.docx`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const generateDocument = async (kind: DocumentKind, data: DocumentData) => {
        if (kind === 'revision') {
            await generateDocumentFromTemplate({
                templateUrl: revisionTemplateUrl,
                replacementMaps: buildCommonReplacements(data),
                filePrefix: 'Solicitud_Revision',
            });
            return;
        }

        if (kind === 'reconsideracion') {
            await generateDocumentFromTemplate({
                templateUrl: reconsiderationTemplateUrl,
                replacementMaps: [buildCommonReplacements(data), buildReconsiderationReplacements(data)],
                filePrefix: 'Recurso_Reconsideracion',
            });
            return;
        }


    };

    const generateRevisionDocument = async (data: DocumentData) => {
        await generateDocument('revision', data);
    };

    const generateReconsiderationDocument = async (data: DocumentData) => {
        await generateDocument('reconsideracion', data);
    };

    return {
        generateDocument,
        generateDocumentFromTemplate,
        generateRevisionDocument,
        generateReconsiderationDocument,
    };
};
