import React from "react";
import estatutosUrl from "../../docs/Estatutos.pdf?url";
import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import PdfViewer from "../../fragments/pdfViewer/PdfViewer";

export const Bylaws: React.FC = () => {
    const fileUrl = estatutosUrl;

    return (
        <>
            <div className="w-full bg-white">
                <PdfViewer url={fileUrl} />
            </div>
            <div className="flex items-center justify-end w-full gap-2 mt-4">
                <MaterialIcon icon="history" />
                <span className="text-right">Ultima actualización: 6 de Agosto de 2026</span>
            </div>
        </>
    );
};