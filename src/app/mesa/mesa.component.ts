import { cartasFutebol, cartasCarros } from './../../mock/cartasMock';
import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
import { cartasHerois } from 'src/mock/cartasMock';
import { cardInterface } from '../card/interfaces/card-interface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})

export class MesaComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  public displayRobo = 'none';
  public animation = '';
  public teste = [1,2]
  public loading = true;
  public atributoSelecionado!: number;
  public baralhoCompleto!: cardInterface[];
  public deckDoJogardor: cardInterface[] = [];
  public deckDoRobo: cardInterface[] = [];
  public cartaJogador: any;
  public cartaRobo: any;
  public tema: any;
  public primeiraCartaJogador: any;
  public primeiraCartaRobo: any;
  public atributoSelecionadoRecebido!: number;
  public vencedor: String = "";
  public jogadorVencedor = 'none';
  public botVencedor = 'none';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tema = params.get('tema');
      this.selecionarTema(params.get('tema'));
    });
    this.destribuirBaralhos();
    this.cartasBatalhando();
  }

  private selecionarTema(tema: string | null){
    switch(tema) {
      case('herois'):
        this.baralhoCompleto = cartasHerois;
        break;
      case('futebol'):
        this.baralhoCompleto = cartasFutebol;
        break;
      case('carros'):
        this.baralhoCompleto = cartasCarros;
        break;
    }
  }

  onAtributoSelecionadoRecebido(atributoSelecionado: number) {
    this.atributoSelecionadoRecebido = atributoSelecionado;
  }

  destribuidorDeCartasJogador(){
    const cartaDistribuida: Array<Number> = [];

    for(let i = 0; i <= 1; i ++){
      const indiceAleatorio = Math.floor(Math.random() * this.baralhoCompleto.length);

      if (cartaDistribuida.includes(indiceAleatorio)) {
        i = i - 1;
        continue;
      }
      else {
        const cartaAleatoria = this.baralhoCompleto[indiceAleatorio];
        this.deckDoJogardor.push(cartaAleatoria);
        cartaDistribuida.push(indiceAleatorio);
      }
    }
    console.log(this.deckDoJogardor)
  }

  destribuidorDeCartasRobo(){
		this.deckDoRobo = this.baralhoCompleto.filter((carta) => !this.deckDoJogardor.includes(carta));
    console.log(this.deckDoRobo)
   }

  cartasBatalhando(){
    this.cartaJogador = this.deckDoJogardor[0];
    this.cartaRobo    = this.deckDoRobo[0];
   }

  destribuirBaralhos(){
    this.destribuidorDeCartasJogador();
    this.destribuidorDeCartasRobo();
  }

  selecionarAtributo(index: number): void {
    this.atributoSelecionado = index;
  }

  cartasDaRodada(){ //Cartas que irão para o final do baralho do vencedor
    this.primeiraCartaJogador = this.deckDoJogardor.shift();
	  this.primeiraCartaRobo = this.deckDoRobo.shift();
  }

  roboVenceRodada(){
    this.cartasDaRodada();

    this.deckDoRobo.push(this.primeiraCartaJogador);
    this.deckDoRobo.push(this.primeiraCartaRobo);
    this.cartasBatalhando();
    console.log("Robo venceu");
    console.log(this.deckDoJogardor);
    console.log(this.deckDoRobo)
    this.verificaQtdCartas()
  }

  jogadorVenceRodada(){
    this.cartasDaRodada();

    this.deckDoJogardor.push(this.primeiraCartaJogador);
    this.deckDoJogardor.push(this.primeiraCartaRobo);
    this.cartasBatalhando()
    console.log("Jogador venceu");
    console.log(this.deckDoJogardor);
    console.log(this.deckDoRobo)
    this.verificaQtdCartas()
  }

  closeModalVencedor(){
    const jogarNovamenteButton = document.getElementById('jogar-novamente');

    if (jogarNovamenteButton) {
      jogarNovamenteButton.addEventListener('click', () => {
      const modal = document.querySelector('.modal') as HTMLElement;
      if (modal) {
        modal.style.display = 'none';
      }
    });
    }
  }

  verificaQtdCartas(){

    if(this.deckDoRobo.length == 0 || this.deckDoJogardor.length == 0){
      if(this.deckDoJogardor.length == 0 ) {
        var modal = document.querySelector('.modal') as HTMLElement;
        var modalContent = document.querySelector('.modal-content') as HTMLElement;
        var firstContainer = document.querySelector('.first-container ') as HTMLElement;
        var secondContainer = document.querySelector('.second-container ') as HTMLElement;

        this.vencedor = "Derrota";

        if(modal){
            modal.style.display = 'block';
        }

        if(modalContent){
          modalContent.style.background = 'linear-gradient(to bottom, #DA9A5E, #9F536A';
        }

        if(firstContainer){
          firstContainer.style.background = 'rgba(87, 0, 5, 0.67)'
        }

        if(secondContainer){
          secondContainer.style.background = '#800303'
        }

        console.log("robo venceu");
      }else{
        var modalContent = document.querySelector('.modal') as HTMLElement;
        this.vencedor = "Vitória";
        if(modalContent){
            modalContent.style.display = 'block';
        }
        console.log("jogador venceu");
      }
    }
  }

  duelo(indicie:any){
    this.displayRobo = 'block';
    this.animation = 'bot-card';
  setTimeout(() => {
      if((this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A") || (this.deckDoRobo[0].indice == "S10" && this.deckDoJogardor[0].indice.substr(0,1) == "A")){
        if(this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A"){
          this.roboVenceRodada();
        }else{
          this.jogadorVenceRodada();
        }
      }
      if(this.deckDoJogardor[0].atributos[indicie].valor > this.deckDoRobo[0].atributos[indicie].valor){
        this.jogadorVenceRodada();
        this.jogadorVencedor = 'block';
      }else{
        this.roboVenceRodada();
        this.botVencedor = 'block';
      }
      this.displayRobo = 'none';
      this.animation = '';
      this.jogadorVencedor = 'none';
      this.botVencedor = 'none';
    }, 3000);
  }
}

