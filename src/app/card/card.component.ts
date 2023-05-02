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
    if (this.reset === true) {
      this.atributoSelecionado = null;
      this.atrRobo = null;
    }
    if(this.robo === true && this.atrRobo !== undefined){
      this.atributoSelecionado = this.atrRobo
    }else{
      this.atributoSelecionado = null;
    }
    this.reset = false;
  }

  selecionarAtributo(index: number, atr: string): void {
    this.robo === false ? this.atributoSelecionado = index : null;
    this.atributoSelecionadoEvent.emit({ index: index, nome: atr});
  }

}

