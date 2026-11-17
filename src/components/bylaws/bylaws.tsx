import React from "react";
import estatutosUrl from "../../docs/Estatutos.pdf?url";
import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import PdfViewer from "../../fragments/pdfViewer/PdfViewer";

export const Bylaws: React.FC = () => {
    const fileUrl = estatutosUrl;
    return (
        <>
            <div className="w-full">
                <PdfViewer url={fileUrl} title="Estatutos" fileName="Estatutos.pdf" />
            </div>
            <div className="surface-panel mt-4 flex items-center justify-end gap-2 px-4 py-2 w-full">
                <MaterialIcon icon="history" className="text-base opacity-70" />
                <span className="text-right text-sm opacity-80">Ultima actualización: 17 de Noviembre de 2026</span>
            </div>
        </>
    );
};