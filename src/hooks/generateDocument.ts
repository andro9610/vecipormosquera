import { Buffer } from 'buffer';
import JSZip from 'jszip';
import revisionTemplateUrl from '../docs/Solicitud_Revision.docx?url';
import reconsiderationTemplateUrl from '../docs/Recurso_Reconsideracion.docx?url';
import expeditionTemplateUrl from '../docs/Solicitud_Expedicion_Predial.docx?url';
import type { RequirementsState } from '../components/toolsPage/revisionForm/states/requirementsReducer';
import type { ReconsiderationState } from '../components/toolsPage/reconsiderationForm/types/reconsiderationState';
import type { ExpeditionState } from '../components/toolsPage/expeditionForm/types/expeditionState';
import { formatNumberedList, formatWordText } from './formatNumberedList';
import { useToastNotification } from './useToastNotification';

type ReplacementInput = Map<string, string> | Map<string, string>[];

type TemplateGenerationOptions = {
    templateUrl: string;
    replacementMaps: ReplacementInput;
    filePrefix: string;
};

type DocumentKind = 'revision' | 'reconsideracion' | 'expedicion';
type DocumentData = RequirementsState | ReconsiderationState | ExpeditionState;
type RevisionBaseDocument = RequirementsState | ReconsiderationState;

const hasActuaComo = (
    data: RevisionBaseDocument
): data is ReconsiderationState => {
    return 'actuaComo' in data.solicitante;
};

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
        if (entry.dir) continue;

        const fileName = entry.name.toLowerCase();
        const isXmlLikeFile = fileName.endsWith('.xml') || fileName.endsWith('.rels') || fileName.endsWith('.vml');

        if (!isXmlLikeFile)  continue;

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

const buildCommonReplacements = (data: RevisionBaseDocument): Map<string, string> => {
    return new Map<string, string>([
        ['Nombre_Solicitante', data.solicitante.nombre?.trim() ?? ''],
        ['Genero_Verbo', data.solicitante.tratamiento?.trim() === 'Sr' ? 'o' : 'a'],
        ['Cedula_Solicitante', data.solicitante.cedula?.trim() ?? ''],
        ['Direccion_Solicitante', data.solicitante.direccion?.trim() ?? ''],
        ['Celular_Solicitante', data.solicitante.celular?.trim() ?? ''],
        ['Correo_Solicitante', data.solicitante.correo?.trim() ?? ''],
        ['Actuacion_Previa', data.actuacionPrevia?.trim() ? `Referencia. ${data.actuacionPrevia.trim()}` : ''],
        ['Hechos_Solicitud', formatNumberedList(data.hechos)],
        ['Peticiones_Solicitud', 'peticiones' in data ? formatNumberedList(data.peticiones) : ''],
    ]);
};



const buildReconsiderationReplacements = (data: RevisionBaseDocument): Map<string, string> => {
    const attachmentList = formatNumberedList(data.anexos.map((name) => ({ value: name })));

    return new Map<string, string>([
        ['Actuacion_Previa', data.actuacionPrevia?.trim() ? `Referencia. ${data.actuacionPrevia.trim()}` : ''],
        ['Nombre_Solicitante', data.solicitante.nombre?.trim() ?? ''],
        ['Genero_Verbo', data.solicitante.tratamiento?.trim() === 'Sr' ? 'o' : 'a'],
        ['Cedula_Solicitante', data.solicitante.cedula?.trim() ?? ''],
        ['Actua_Como', hasActuaComo(data) && data.solicitante.actuaComo 
            ? data.solicitante.tratamiento?.trim() === 'Sr' ? 'Propietario' : 'Propietaria'
            : data.solicitante.tratamiento?.trim() === 'Sr' ? 'Poseedor' : 'Poseedora' ],
        ['Identificador_Inmueble', data.solicitante.identificador?.trim() ?? ''],
        ['Numero_Identificacion_Inmueble', data.solicitante.numeroIdentificacion?.trim() ?? ''],
        ['Direccion_Solicitante', data.solicitante.direccion?.trim() ?? ''],
        ['Fundamentos_Hecho_Derecho', formatNumberedList(data.hechos)],
        ['Anexos_Solicitud', attachmentList],
        ['Correo_Solicitante', data.solicitante.correo?.trim() ?? ''],
        ['Celular_Solicitante', data.solicitante.celular?.trim() ?? ''],
    ]);
};

const buildExpeditionReplacements = (data: DocumentData): Map<string, string> => {
    const expedition = data as ExpeditionState;

    return new Map<string, string>([
        ['Nombre_Solicitante', expedition.solicitante.nombre?.trim() ?? ''],
        ['Genero_Verbo', expedition.solicitante.tratamiento?.trim() === 'Sr' ? 'o' : 'a'],
        ['Cedula_Solicitante', expedition.solicitante.cedula?.trim() ?? ''],
                        ['Actua_Como', expedition.solicitante.actuaComo
            ? expedition.solicitante.tratamiento?.trim() === 'Sr' ? 'Propietario' : 'Propietaria'
            : expedition.solicitante.tratamiento?.trim() === 'Sr' ? 'Poseedor' : 'Poseedora'],
        ['Direccion_Solicitante', expedition.solicitante.direccion?.trim() ?? ''],
        ['Celular_Solicitante', expedition.solicitante.celular?.trim() ?? ''],
        ['Correo_Solicitante', expedition.solicitante.correo?.trim() ?? ''],
        ['Identificador_Inmueble', expedition.predio?.identificador?.trim() ?? ''],
        ['Numero_Identificacion_Inmueble', expedition.predio?.numeroIdentificacion?.trim() ?? ''],
        ['Direccion_Predio', expedition.predio?.direccion?.trim() ?? ''],
        ['Adicion_Catastral', expedition.predio?.numeroIdentificacion.trim().length > 0 ? `y ${expedition.predio?.identificador?.trim()} ${expedition.predio?.numeroIdentificacion?.trim()}` : '']
    ]);
};

export const useDocumentTools = () => {
    const { notify } = useToastNotification();
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
        notify('success', 'Documento generado correctamente');
    };

        const generateDocument = async (kind: DocumentKind, data: DocumentData) => {
        if (kind === 'revision') {
            await generateDocumentFromTemplate({
                templateUrl: revisionTemplateUrl,
                replacementMaps: buildCommonReplacements(data as RevisionBaseDocument),
                filePrefix: 'Solicitud_Revision',
            });
            return;
        }

        if (kind === 'reconsideracion') {
            await generateDocumentFromTemplate({
                templateUrl: reconsiderationTemplateUrl,
                replacementMaps: [buildCommonReplacements(data as RevisionBaseDocument), buildReconsiderationReplacements(data as RevisionBaseDocument)],
                filePrefix: 'Recurso_Reconsideracion',
            });
            return;
        }

        if (kind === 'expedicion') {
            await generateDocumentFromTemplate({
                templateUrl: expeditionTemplateUrl,
                replacementMaps: buildExpeditionReplacements(data),
                filePrefix: 'Solicitud_Expedicion_Predial',
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

    const generateExpeditionDocument = async (data: DocumentData) => {
        await generateDocument('expedicion', data);
    }

    return {
        generateDocument,
        generateDocumentFromTemplate,
        generateRevisionDocument,
        generateReconsiderationDocument,
        generateExpeditionDocument
    };
};
