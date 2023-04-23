import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cardInterface, atributoInterface } from './interfaces/card-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
	@Input() public carta!: any;
  @Output() public atributoSelecionadoEvent = new EventEmitter<number>();
  public atributoSelecionado!:number;
  public loading = true;


  constructor() {}

  selecionarAtributo(index:number): void {
    console.log(index)
    this.atributoSelecionadoEvent.emit(index);
  }

}
