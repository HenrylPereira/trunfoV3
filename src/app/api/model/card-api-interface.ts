import { attribute } from "./attribute-api-interface";

export interface card {
    titulo: string;
    indice: string;
    imageUrl: [];
    atributos: attribute[];
}