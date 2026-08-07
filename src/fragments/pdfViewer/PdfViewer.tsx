import React, { useEffect, useRef, useState } from "react";
import { MaterialIcon } from "../materialIcon/MaterialIcon";

type Props = {
    url: string;
};

const SCRIPT_URL = "https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.min.js";
const WORKER_URL = "https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js";

export const PdfViewer: React.FC<Props> = ({ url }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [numPages, setNumPages] = useState(0);

    const loadScript = () => new Promise<void>((resolve, reject) => {
        if ((window as any).pdfjsLib) return resolve();
        const s = document.createElement("script");
        s.src = SCRIPT_URL;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load PDF.js script"));
        document.head.appendChild(s);
    });

    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            setLoading(true);
            setError(null);
            try {
                await loadScript();
                const pdfjsLib = (window as any).pdfjsLib;
                if (!pdfjsLib) throw new Error("pdfjsLib not available");
                pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;

                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;
                if (cancelled) return;
                setNumPages(pdf.numPages || 0);
                setPageNumber(1);
                setLoading(false);
            } catch (err: any) {
                if (cancelled) return;
                setError(err?.message || String(err));
                setLoading(false);
            }
        };

        init();
        return () => { cancelled = true; };
    }, [url]);

    useEffect(() => {
        let cancelled = false;
        const renderPage = async () => {
            if (!pageNumber) return;
            try {
                const pdfjsLib = (window as any).pdfjsLib;
                if (!pdfjsLib) return;
                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;
                if (cancelled) return;
                const page = await pdf.getPage(pageNumber);
                if (cancelled) return;

                const viewport = page.getViewport({ scale: 1 });
                const containerWidth = containerRef.current ? containerRef.current.clientWidth : viewport.width;
                const scale = Math.max(1, containerWidth / viewport.width);
                const scaledViewport = page.getViewport({ scale });

                const canvas = canvasRef.current as HTMLCanvasElement;
                const context = canvas.getContext("2d");
                canvas.width = Math.floor(scaledViewport.width);
                canvas.height = Math.floor(scaledViewport.height);

                await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
            } catch (err) {
                /* no-op: errors already handled in init */
            }
        };

        renderPage();
        return () => { cancelled = true; };
    }, [pageNumber, url]);

    const prev = () => setPageNumber(p => Math.max(1, p - 1));
    const next = () => setPageNumber(p => Math.min(numPages || p + 1, p + 1));

    return (
        <div className="w-full h-full bg-white flex flex-col border border-gray-300 rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between p-2 border-b bg-gray-50">
                <div className="flex items-center gap-2">
                    <button onClick={prev} disabled={pageNumber <= 1} className="w-9 h-9 flex items-center justify-center border rounded disabled:opacity-50 disabled:border-none"><MaterialIcon icon="chevron_left" /></button>
                    <button onClick={next} disabled={numPages > 0 && pageNumber >= numPages} className="w-9 h-9 flex items-center justify-center bg-white border rounded disabled:opacity-50 disabled:border-none"><MaterialIcon icon="chevron_right" /></button>
                </div>
                <div className="label-text font-bold">Página {pageNumber}{numPages ? ` de ${numPages}` : ""}</div>
            </div>
            <div ref={containerRef} className="flex-1 overflow-auto p-4">
                {loading && !error && <div>Cargando estatutos…</div>}
                {error && (
                    <div className="p-4 text-center">
                        <p>Error mostrando el PDF: {error}</p>
                    </div>
                )}
                <div className="flex justify-center">
                    <canvas ref={canvasRef} style={{ display: loading || error ? "none" : "block", maxWidth: "100%", height: "auto" }} />
                </div>
            </div>
        </div>
    );
};

export default PdfViewer;
