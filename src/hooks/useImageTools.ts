

export const useImageTools = () => {
    //**Permite importar assets desde la raiz del proyecto */
    const buildAssetUrl = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path}`;

    return {
		buildAssetUrl,
	};
};