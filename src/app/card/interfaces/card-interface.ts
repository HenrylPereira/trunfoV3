export interface cardInterface {
  titulo: string;
  indice: string;
  atributos: atributoInterface[];
  imageUrl?: string;
  cor: string;
}

export interface atributoInterface {
  titulo: string;
  valor: number;
}
