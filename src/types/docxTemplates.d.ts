declare module 'docx-templates/lib/browser.js' {
    export function createReport(options: {
        template: Uint8Array | ArrayBuffer;
        data: Record<string, unknown>;
        noSandbox?: boolean;
    }): Promise<Uint8Array>;
}
