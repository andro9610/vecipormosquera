import { Buffer } from 'buffer';
import JSZip from 'jszip';
import type { RequirementsState } from '../reducers/requirementsReducer';

if (typeof globalThis.Buffer === 'undefined') {
    (globalThis as typeof globalThis & { Buffer?: typeof Buffer }).Buffer = Buffer;
}

const formatNumberedList = (items: Array<{ value: string }>) => {
    return items
        .map((item, index) => {
            const trimmedValue = item.value.trim();
            return trimmedValue ? `${index + 1}. ${trimmedValue}` : '';
        })
        .filter(Boolean)
        .join('\n\n');
};

export const useDocumentTools = () => {
    const generateDocument = async (data: RequirementsState) => {
        const templateUrl = new URL('../docs/Solicitud_Revision.docx', import.meta.url).href;
        const response = await fetch(templateUrl);

        if (!response.ok) {
            throw new Error('No se pudo cargar la plantilla del documento');
        }

        const arrayBuffer = await response.arrayBuffer();
        const archive = await JSZip.loadAsync(arrayBuffer);

        const replacements = new Map<string, string>([
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

            for (const [marker, value] of replacements) {
                const escapedValue = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                updatedContent = updatedContent.split(marker).join(escapedValue);
            }

            if (updatedContent !== originalContent) {
                archive.file(entry.name, updatedContent);
            }
        }

        const templateData = Object.fromEntries(Array.from(replacements.entries()).map(([key, value]) => [key, value]));

        const templateBuffer = await archive.generateAsync({ type: 'uint8array' });
        const docxTemplateModule = await import('docx-templates/lib/browser.js');
        const createReport = (docxTemplateModule as { createReport?: (options: { template: Uint8Array; data: Record<string, string>; noSandbox?: boolean }) => Promise<Uint8Array> }).createReport;

        if (typeof createReport !== 'function') {
            throw new Error('La librería docx-templates no expone createReport en este entorno');
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
        link.download = 'Solicitud_Revision.docx';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return { generateDocument };
};