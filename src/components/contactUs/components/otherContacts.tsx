import { useImageTools } from "../../../hooks/useImageTools";

interface SocialNetwork {
    name: string;
    iconUrl: string;
    url: string;
    handle: string;
}

// TODO: Llevar Las redes sociales a la base de datos
const SOCIAL_NETWORKS: SocialNetwork[] = [
    {
        name: "facebook",
        iconUrl: "images/social/facebook.webp",
        url: "https://www.facebook.com/vecipormosquera",
        handle: "@vecipormosquera",
    },
    {
        name: "instagram",
        iconUrl: "images/social/instagram.webp",
        url: "https://www.instagram.com/vecipormosquera/",
        handle: "@vecipormosquera",
    },
    {
        name: "tiktok",
        iconUrl: "images/social/tiktok.svg",
        url: "https://www.tiktok.com/@vecipormosquera",
        handle: "@vecipormosquera",
    },
];

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
            <div className="flex flex-wrap items-center gap-4 md:pt-7 sm:pt-3 sm:pt-5 sm:pb-5 xs:pt-5 xs:pb-5">
                {SOCIAL_NETWORKS.map((network) => (
                    <div key={network.name} className="flex flex-wrap items-center gap-3">
                        <a
                            href={network.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-wrap items-center gap-3"
                        >
                            <img
                                src={buildAssetUrl(network.iconUrl)}
                                alt={network.name}
                                className="w-full max-w-12.5 h-auto"
                            />
                            <span className="text-sm font-bold whitespace-nowrap hidden xl:flex">{network.handle}</span>
                        </a>
                    </div>
                ))}
            </div>
        </>

    );
}