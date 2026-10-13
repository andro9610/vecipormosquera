import { MaterialIcon } from "../../../fragments/materialIcon/MaterialIcon";
import { useImageTools } from "../../../hooks/useImageTools";

interface SocialNetwork {
    name: string;
    label: string;
    iconUrl: string;
    url: string;
    handle: string;
}

// TODO: Llevar Las redes sociales a la base de datos
const SOCIAL_NETWORKS: SocialNetwork[] = [
    {
        name: "facebook",
        label: "Facebook",
        iconUrl: "images/social/facebook.webp",
        url: "https://www.facebook.com/vecipormosquera",
        handle: "@vecipormosquera",
    },
    {
        name: "instagram",
        label: "Instagram",
        iconUrl: "images/social/instagram.webp",
        url: "https://www.instagram.com/vecipormosquera/",
        handle: "@vecipormosquera",
    },
    {
        name: "tiktok",
        label: "TikTok",
        iconUrl: "images/social/tiktok.svg",
        url: "https://www.tiktok.com/@vecipormosquera",
        handle: "@vecipormosquera",
    },
];

export const OtherContacts = () => {
    const { buildAssetUrl } = useImageTools();

    return (
        <section className="flex flex-col gap-5">
            <img
                src={buildAssetUrl("logo_vector.svg")}
                alt="Logo Veeduría Ciudadana por el Pueblo de Mosquera"
                className="mx-auto h-auto w-full max-w-56 rounded-2xl p-4 dark:bg-white dark:ring-1 dark:ring-white/20"
            />

            <div className="flex flex-col gap-1 text-center">
                <span className="label-text text-xs font-semibold text-primary">Síguenos en redes</span>
                <p className="text-sm text-base-content/70">
                    Entérate de nuestras actividades y comparte nuestra labor.
                </p>
            </div>

            <div className="grid gap-3">
                {SOCIAL_NETWORKS.map((network) => (
                    <a
                        key={network.name}
                        href={network.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${network.label} de la veeduría`}
                        className="group flex items-center gap-4 rounded-2xl border border-base-content/10 bg-base-100/70 p-3 transition hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white p-2 ring-1 ring-black/10">
                            <img
                                src={buildAssetUrl(network.iconUrl)}
                                alt={network.label}
                                className="size-6 object-contain"
                            />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-sm font-semibold">{network.label}</span>
                            <span className="truncate text-xs text-base-content/60">{network.handle}</span>
                        </span>
                        <MaterialIcon
                            icon="north_east"
                            className="text-base text-base-content/40 transition group-hover:text-primary"
                        />
                    </a>
                ))}
            </div>
        </section>
    );
};
