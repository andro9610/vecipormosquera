import React, { useEffect, useRef, useState } from "react";
import { MaterialIcon } from "../materialIcon/MaterialIcon";

type Props = {
    url: string;
    title?: string;
    fileName?: string;
};

const SCRIPT_URL = "https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.min.js";
const WORKER_URL = "https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

const ICON_BUTTON_CLASS =
    "flex h-8 w-8 items-center justify-center rounded-md text-base-content transition hover:bg-base-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent";

const cancelRenderTask = (task: any) =>
    Promise.resolve()
        .then(() => task?.cancel())
        .catch(() => undefined)
        .then(() => task?.promise)
        .catch(() => undefined);

export const PdfViewer: React.FC<Props> = ({ url, title = "Documento", fileName }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const viewerRef = useRef<HTMLDivElement | null>(null);
    const pdfRef = useRef<any>(null);
    const renderTaskRef = useRef<any>(null);
    const renderIdRef = useRef(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageInput, setPageInput] = useState("1");
    const [numPages, setNumPages] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [width, setWidth] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const loadScript = () =>
        new Promise<void>((resolve, reject) => {
            if ((window as any).pdfjsLib) return resolve();
            const script = document.createElement("script");
            script.src = SCRIPT_URL;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("No fue posible cargar el visor de PDF"));
            document.head.appendChild(script);
        });

    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            setLoading(true);
            setError(null);
            setNumPages(0);
            setPageNumber(0);
            setZoom(1);
            pdfRef.current = null;

            try {
                await loadScript();
                const pdfjsLib = (window as any).pdfjsLib;
                if (!pdfjsLib) throw new Error("El visor de PDF no está disponible");
                pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;

                const pdf = await pdfjsLib.getDocument(url).promise;
                if (cancelled) return;

                pdfRef.current = pdf;
                setNumPages(pdf.numPages || 0);
                setPageNumber(1);
            } catch (err: any) {
                if (cancelled) return;
                setError(err?.message || String(err));
                setLoading(false);
            }
        };

        init();
        return () => {
            cancelled = true;
        };
    }, [url, reloadKey]);

    useEffect(() => {
        let cancelled = false;

        const stopPreviousRender = async () => {
            const task = renderTaskRef.current;
            if (!task) return;
            renderTaskRef.current = null;
            await cancelRenderTask(task);
        };

        const renderPage = async () => {
            const pdf = pdfRef.current;
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!pdf || !canvas || !container || !pageNumber) return;

            const renderId = ++renderIdRef.current;
            const isStale = () => cancelled || renderId !== renderIdRef.current;

            await stopPreviousRender();
            if (isStale()) return;

            try {
                const page = await pdf.getPage(pageNumber);
                if (isStale()) return;

                const baseViewport = page.getViewport({ scale: 1 });
                const available = Math.max((width || container.clientWidth) - 16, 240);
                const scale = (available / baseViewport.width) * zoom;
                const viewport = page.getViewport({ scale });
                const ratio = window.devicePixelRatio || 1;
                const context = canvas.getContext("2d");
                if (!context) return;

                canvas.width = Math.floor(viewport.width * ratio);
                canvas.height = Math.floor(viewport.height * ratio);
                canvas.style.width = `${Math.floor(viewport.width)}px`;
                canvas.style.height = `${Math.floor(viewport.height)}px`;

                const task = page.render({
                    canvasContext: context,
                    viewport,
                    transform: ratio !== 1 ? [ratio, 0, 0, ratio, 0, 0] : undefined,
                });
                renderTaskRef.current = task;
                await task.promise;
                renderTaskRef.current = null;

                if (isStale()) return;
                setLoading(false);
            } catch (err: any) {
                if (isStale()) return;
                if (err?.name === "RenderingCancelledException") return;
                setError(err?.message || String(err));
                setLoading(false);
            }
        };

        renderPage();
        return () => {
            cancelled = true;
            renderIdRef.current += 1;
            cancelRenderTask(renderTaskRef.current);
            renderTaskRef.current = null;
        };
    }, [pageNumber, zoom, width, numPages, reloadKey]);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new ResizeObserver((entries) => {
            const next = Math.floor(entries[0].contentRect.width);
            setWidth((previous) => (Math.abs(previous - next) > 1 ? next : previous));
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onChange = () => setIsFullscreen(document.fullscreenElement === viewerRef.current);
        document.addEventListener("fullscreenchange", onChange);
        return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);

    useEffect(() => {
        setPageInput(pageNumber ? String(pageNumber) : "1");
        if (containerRef.current) containerRef.current.scrollTo({ top: 0 });
    }, [pageNumber]);

    const goToPage = (target: number) => {
        setPageNumber(Math.min(Math.max(1, target), numPages || 1));
    };

    const prev = () => goToPage(pageNumber - 1);
    const next = () => goToPage(pageNumber + 1);
    const zoomIn = () => setZoom((value) => Math.min(MAX_ZOOM, Number((value + ZOOM_STEP).toFixed(2))));
    const zoomOut = () => setZoom((value) => Math.max(MIN_ZOOM, Number((value - ZOOM_STEP).toFixed(2))));

    const commitPage = () => {
        const parsed = Number(pageInput);
        const target = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
        goToPage(target);
        setPageInput(String(Math.min(Math.max(1, target), numPages || 1)));
    };

    const toggleFullscreen = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await viewerRef.current?.requestFullscreen();
            }
        } catch {
            setIsFullscreen(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            next();
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            prev();
        }
        if (event.key === "+" || event.key === "=") zoomIn();
        if (event.key === "-") zoomOut();
    };

    return (
        <div
            ref={viewerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={`surface-panel flex w-full flex-col overflow-hidden outline-none ${
                isFullscreen ? "h-screen rounded-none border-0" : "h-[80vh] min-h-[460px]"
            }`}
        >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 bg-base-200/70 px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MaterialIcon icon="description" />
                    </span>
                    <div className="min-w-0">
                        <p className="label-text truncate text-sm font-bold">{title}</p>
                        <p className="truncate text-[11px] opacity-60">
                            {numPages ? `${numPages} ${numPages === 1 ? "página" : "páginas"}` : "Documento PDF"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 rounded-lg border border-base-300 bg-base-100 p-1">
                        <button
                            type="button"
                            onClick={prev}
                            disabled={loading || pageNumber <= 1}
                            aria-label="Página anterior"
                            className={ICON_BUTTON_CLASS}
                        >
                            <MaterialIcon icon="chevron_left" />
                        </button>
                        <input
                            value={pageInput}
                            onChange={(event) => setPageInput(event.target.value.replace(/\D/g, ""))}
                            onBlur={commitPage}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") commitPage();
                            }}
                            disabled={loading || !numPages}
                            inputMode="numeric"
                            aria-label="Número de página"
                            className="h-8 w-11 rounded-md border border-base-300 bg-base-100 text-center text-sm outline-none transition focus:border-primary disabled:opacity-50"
                        />
                        <span className="px-1 text-xs opacity-60">/ {numPages || "—"}</span>
                        <button
                            type="button"
                            onClick={next}
                            disabled={loading || !numPages || pageNumber >= numPages}
                            aria-label="Página siguiente"
                            className={ICON_BUTTON_CLASS}
                        >
                            <MaterialIcon icon="chevron_right" />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg border border-base-300 bg-base-100 p-1">
                        <button
                            type="button"
                            onClick={zoomOut}
                            disabled={loading || zoom <= MIN_ZOOM}
                            aria-label="Reducir zoom"
                            className={ICON_BUTTON_CLASS}
                        >
                            <MaterialIcon icon="zoom_out" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setZoom(1)}
                            disabled={loading}
                            title="Ajustar a la pantalla"
                            className="h-8 min-w-12 rounded-md px-2 text-xs font-semibold transition hover:bg-base-200 disabled:opacity-50"
                        >
                            {Math.round(zoom * 100)}%
                        </button>
                        <button
                            type="button"
                            onClick={zoomIn}
                            disabled={loading || zoom >= MAX_ZOOM}
                            aria-label="Aumentar zoom"
                            className={ICON_BUTTON_CLASS}
                        >
                            <MaterialIcon icon="zoom_in" />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg border border-base-300 bg-base-100 p-1">
                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            aria-label="Pantalla completa"
                            className={ICON_BUTTON_CLASS}
                        >
                            <MaterialIcon icon={isFullscreen ? "fullscreen_exit" : "fullscreen"} />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative flex-1 overflow-auto bg-base-300/40 p-4 sm:p-6"
            >
                <div className="flex min-h-full justify-center">
                    <canvas
                        ref={canvasRef}
                        className={`max-w-none rounded-sm bg-white shadow-2xl ring-1 ring-black/10 transition-opacity duration-200 ${
                            loading || error ? "opacity-0" : "opacity-100"
                        }`}
                    />
                </div>

                {loading && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-base-100/85 backdrop-blur-sm">
                        <MaterialIcon icon="progress_activity" className="animate-spin text-3xl text-primary" />
                        <span className="label-text text-sm opacity-80">Cargando documento…</span>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-base-100/95 p-6 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
                            <MaterialIcon icon="error" className="text-3xl" />
                        </span>
                        <p className="label-text text-base font-bold">No fue posible mostrar el documento</p>
                        <p className="max-w-md text-sm opacity-70">{error}</p>
                        <button
                            type="button"
                            onClick={() => setReloadKey((value) => value + 1)}
                            className="btn btn-sm btn-primary gap-2"
                        >
                            <MaterialIcon icon="refresh" /> Reintentar
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-base-300 bg-base-200/70 px-3 py-1.5 text-[11px] opacity-70">
                <span className="truncate">{fileName ?? title}</span>
                <span className="hidden sm:inline">Usa las flechas ← → para cambiar de página</span>
                <span>{numPages ? `Página ${pageNumber} de ${numPages}` : "—"}</span>
            </div>
        </div>
    );
};

export default PdfViewer;
