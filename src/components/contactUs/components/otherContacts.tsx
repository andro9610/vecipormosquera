import { useImageTools } from "../../../hooks/useImageTools";

export const OtherContacts = () => {
    const { buildAssetUrl } = useImageTools();

    return (
        <>
            <div className="flex flex-col items-center">
                <img
                    src={buildAssetUrl("logo_vector.svg")}
                    alt="Logo"
                    className="w-full max-w-100 h-auto"
                />
            </div>
            <p className="text-2xl font-semibold uppercase tracking-[0.3em] text-slate-600 pt-20">Siguenos en redes</p>
            <div className="flex flex-wrap items-center gap-4 md:pt-7">
                <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.facebook.com/vecipormosquera" target="_blank" rel="noopener noreferrer" className="flex flex-wrap items-center gap-3">
                        <img
                            src={buildAssetUrl("images/social/facebook.webp")}
                            alt="facebook"
                            className="w-full max-w-12.5 h-auto"
                        />
                        <span className="text-sm font-bold whitespace-nowrap hidden xl:flex">@vecipormosquera</span>
                    </a>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.instagram.com/vecipormosquera/" target="_blank" rel="noopener noreferrer" className="flex flex-wrap items-center gap-3">
                        <img
                            src={buildAssetUrl("images/social/instagram.webp")}
                            alt="instagram"
                            className="w-full max-w-12.5 h-auto"
                        />
                        <span className="text-sm font-bold whitespace-nowrap hidden xl:flex">@vecipormosquera</span>
                    </a>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <a href="https://www.tiktok.com/@vecipormosquera" target="_blank" rel="noopener noreferrer" className="flex flex-wrap items-center gap-3">
                        <img
                            src={buildAssetUrl("images/social/tiktok.svg")}
                            alt="tiktok"
                            className="w-full max-w-12.5 h-auto"
                        />
                        <span className="text-sm font-bold whitespace-nowrap hidden xl:flex">@vecipormosquera</span>
                    </a>
                </div>
            </div>
        </>

    );
}