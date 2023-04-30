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
  @Input() public atrRobo: any;
	@Input() public carta!: any;
  @Output() public atributoSelecionadoEvent = new EventEmitter<any>();
  public atributoSelecionado!: number | null;
  public loading = true;


  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reset === true && !this.robo) {
      this.atributoSelecionado = null;
      this.atrRobo = null;
    }
    this.robo === true && this.atrRobo ? this.atributoSelecionado = this.atrRobo : null;

    if(this.robo && this.reset){
      this.atributoSelecionado = null;
    }
  }

  selecionarAtributo(index: number, atr: string): void {
    this.robo === false ? this.atributoSelecionado = index : null;
    this.atributoSelecionadoEvent.emit({ index: index, nome: atr});
  }

}

