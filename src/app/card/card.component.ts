import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { cardInterface, atributoInterface } from './interfaces/card-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  @Input() public robo = false;
  @Input() public reset: any;
	@Input() public carta!: any;
  @Output() public atributoSelecionadoEvent = new EventEmitter<number>();
  public atributoSelecionado!: number | null;
  public loading = true;


  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('entoruu');
    if (this.reset === true) {
      this.atributoSelecionado = null;
    }
  }

  selecionarAtributo(index:number): void {
    this.robo === false ? this.atributoSelecionado = index : null;
    this.atributoSelecionadoEvent.emit(index);
  }

}
