export const buildAssetUrl = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path}`;
