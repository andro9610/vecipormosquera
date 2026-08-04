import type { SortableTextItem } from "../../../types/sortableTextItem";

export type ReconsiderationState = {
    actuacionPrevia: string;
    solicitante: {
        tratamiento: string;
        actuaComo: boolean;
        nombre: string;
        cedula: string;
        direccion: string;
        identificador: string;
        numeroIdentificacion: string;
        celular: string;
        correo: string;
    };
    hechos: SortableTextItem[];
    anexos: string[];
};