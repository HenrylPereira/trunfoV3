import { attribute } from "./attribute-api-interface";

export interface card {
    id: number;
    name: string;
    description: string;
    image: [];
    attributes: attribute[];
}