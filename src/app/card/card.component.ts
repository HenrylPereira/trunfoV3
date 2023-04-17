import { Component } from '@angular/core';
import { cardInterface } from './interfaces/card-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  public loading = true;
  public atributoSelecionado!: number;

  constructor() {}

  public carta: cardInterface = {
    titulo: 'Thor',
    indice: 'B3',
    atributos: [
      { titulo: 'Força', valor: 3 },
      { titulo: 'Agilidade', valor: 30 },
      { titulo: 'Inteligência', valor: 100 },
      { titulo: 'Magia', valor: 50 },
      { titulo: 'Velocidade', valor: 3 },
    ],
    cor: '',
    imageUrl: 'https://i.pinimg.com/originals/60/08/33/6008331c18580e1eb3d6b7804d4c4c1a.jpg'
  };

  selecionarAtributo(index: number): void {
    this.atributoSelecionado = index;
  }
}
