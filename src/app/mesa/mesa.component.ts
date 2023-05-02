import { COMPILER_OPTIONS, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { cardInterface } from '../card/interfaces/card-interface';
import { ActivatedRoute } from '@angular/router';
import { cartasFutebol, cartasCarros , cartasHerois} from './../../mock/cartasMock';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})

export class MesaComponent implements OnInit{
  @Output() resetEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetRoboEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() atributoSelecionadoRobo: EventEmitter<number> = new EventEmitter<number>();

  public displayRobo = 'none';
  public animation = '';
  public loading = false;
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
  public vencedor: string = "";
  public jogadorVencedor = 'none';
  public botVencedor = 'none';
  public resultadoPlacar!: string;
  public atributoMaisForteDaCarta!:number;
  public indicieDoMelhorAtributoRobo!: number;
  public atributoName!: string;
  public backImage!: string;


	constructor(private router:Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading = true
    this.route.paramMap.subscribe(params => {
      this.tema = params.get('tema');
      this.selecionarTema(params.get('tema'));
    });
    this.destribuirBaralhos();
    this.cartasBatalhando();
    this.pegarClicknoBotaoJogarNovamente();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  private selecionarTema(tema: string | null){
    switch(tema) {
      case('herois'):
        this.baralhoCompleto = cartasHerois;
        this.backImage = "url('https://static.vecteezy.com/ti/vetor-gratis/p3/13168075-fundo-de-meio-tom-de-batalha-de-super-herois-com-um-flash-versus-design-de-relampago-ilustracaoial-vetor.jpg')";
        break;
      case('futebol'):
        this.baralhoCompleto = cartasFutebol;
        this.backImage = "url('https://static.vecteezy.com/system/resources/previews/003/106/558/original/soccer-stadium-night-background-free-vector.jpg')";
        break;
      case('carros'):
        this.baralhoCompleto = cartasCarros;
        this.backImage = "url('https://www.r2pg.com.br/wp-content/uploads/2017/06/piotr-dura-tree-of-the-forgotten2k.jpg')";
        break;
    }
  }

  onAtributoSelecionadoRecebido(atributoSelecionado: any) {
    this.atributoSelecionadoRecebido = atributoSelecionado.index;
    this.atributoName = atributoSelecionado.nome.titulo;
  }

  destribuidorDeCartasJogador(){
    const cartaDistribuida: Array<Number> = [];

    for(let i = 0; i <= 4; i ++){ //era 7 tem que ser a metade
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
  }

  destribuidorDeCartasRobo(){
		this.deckDoRobo = this.baralhoCompleto.filter((carta) => !this.deckDoJogardor.includes(carta));
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
    const botaoDuelo = document.querySelector('.play-btn') as HTMLElement;


    if (botaoDuelo) {
      botaoDuelo.style.display = 'none';
    }

    this.cartasDaRodada();
    this.deckDoRobo.push(this.primeiraCartaJogador);
    this.deckDoRobo.push(this.primeiraCartaRobo);
    this.cartasBatalhando();
    this.verificaQtdCartas();

    const indiceDoMelhorAtributoRobo = this.encontrarIndiceDoMelhorAtributo(this.deckDoRobo[0]);
    this.displayRobo = 'none';
    this.animation = '';
    setTimeout(() => {
      if(this.deckDoJogardor.length !== 0){
        this.displayRobo = 'block';
      }
      this.atributoSelecionadoRobo.emit(indiceDoMelhorAtributoRobo);
    },500);
    this.duelo(indiceDoMelhorAtributoRobo);
    this.displayRobo = 'none';
  }

  jogadorVenceRodada(){
    this.atributoSelecionadoRobo.emit(undefined);   //Bug resolvido

    const botaoDuelo = document.querySelector('.play-btn') as HTMLElement;

    if (botaoDuelo) {
      botaoDuelo.style.display = 'block';
    }

    this.cartasDaRodada();

    this.deckDoJogardor.push(this.primeiraCartaRobo);
    this.deckDoJogardor.push(this.primeiraCartaJogador);
    this.cartasBatalhando()
    this.verificaQtdCartas()
  }


  jogarNovamente(){
    location.reload();
  }

  pegarClicknoBotaoJogarNovamente(){
    const jogarNovamenteButton = document.getElementById('jogar-novamente');

    if (jogarNovamenteButton) {
      jogarNovamenteButton.addEventListener('click', this.closeModal.bind(this));
    }
  }

  closeModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }

  navigateToMenu(){
    this.router.navigate(['menu']);
  }

  roboVencedorDaPartida(){
    this.animation = '';
    this.displayRobo = 'none';
    var modal = document.querySelector('.modal') as HTMLElement;
    var modalContent = document.querySelector('.modal-content') as HTMLElement;
    var firstContainer = document.querySelector('.first-container ') as HTMLElement;
    var secondContainer = document.querySelector('.second-container ') as HTMLElement;

    if(modal || modalContent || firstContainer || secondContainer){
      modal.style.display = 'block';
      modalContent.style.background = 'linear-gradient(to bottom, #DA9A5E, #9F536A';
      firstContainer.style.background = 'rgba(87, 0, 5, 0.67)'
      secondContainer.style.background = '#800303'
    }

    this.vencedor = "Derrota";
  }

  jogadorVencedorDaPartida(){
    this.animation = '';
    this.displayRobo = 'none';
    var modal = document.querySelector('.modal') as HTMLElement;
    var modalContent = document.querySelector('.modal-content') as HTMLElement;
    var firstContainer = document.querySelector('.first-container ') as HTMLElement;
    var secondContainer = document.querySelector('.second-container ') as HTMLElement;

    if(modal || modalContent || firstContainer || secondContainer){
      modal.style.display = 'block';
      modalContent.style.background = 'linear-gradient(to bottom, #5BBABA, #B1A857)';
      firstContainer.style.background = 'rgba(0, 87, 77, 0.55)';
      secondContainer.style.background = '#028f7e';
    }

    this.vencedor = "Vitória";
  }

  verificaQtdCartas(){

    if(this.deckDoRobo.length == 0 && this.deckDoJogardor.length == this.deckDoJogardor.length|| this.deckDoJogardor.length == 0 && this.deckDoRobo.length == this.deckDoRobo.length){
      if(this.deckDoRobo.length == 0 && this.deckDoJogardor.length == this.deckDoJogardor.length) {
        this.jogadorVencedorDaPartida();
      }else{
        this.roboVencedorDaPartida();
      }
    }
  }

  tratamentoTrunfo(){
    if((this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A") || (this.deckDoRobo[0].indice == "S10" && this.deckDoJogardor[0].indice.substring(0,1) == "A")){
      if(this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A"){
        this.roboVenceRodada();
      }else{
        this.jogadorVenceRodada();
      }
    }else{
      if(this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) != "A"){
        this.jogadorVenceRodada();
      }
      if(this.deckDoRobo[0].indice == "S10" && this.deckDoJogardor[0].indice.substring(0,1) != "A"){
        this.roboVenceRodada();
      }
    }
    this.displayRobo = 'none';
  }

  varificaPlacar(indicie:any){
    setTimeout(() => {
      var placar = document.querySelector('.placar') as HTMLElement;

      if(this.deckDoJogardor[0].indice == "S10" || this.deckDoRobo[0].indice == "S10"){
        if((this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A") || (this.deckDoRobo[0].indice == "S10" && this.deckDoJogardor[0].indice.substring(0,1) == "A")){
          if(this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A"){
            this.resultadoPlacar = "Perdeu a Rodada";
            if(placar){
              placar.style.display= 'flex';
              placar.style.background = '#FF434E'
            }
          }else{
            this.resultadoPlacar = "Venceu a Rodada";
            if(placar){
              placar.style.display= 'flex';
              placar.style.background = '#43FF78'
            }
          }
        }else{
          if(this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) != "A"){
            this.resultadoPlacar = "Venceu a Rodada";
            if(placar){
              placar.style.display= 'flex';
              placar.style.background = '#43FF78'
            }
          }
          if(this.deckDoRobo[0].indice == "S10" && this.deckDoJogardor[0].indice.substring(0,1) != "A"){
            this.resultadoPlacar = "Perdeu a Rodada";
            if(placar){
              placar.style.display= 'flex';
              placar.style.background = '#FF434E'
            }
          }
        }
      }else{
        if(this.deckDoJogardor[0].atributos[indicie].valor > this.deckDoRobo[0].atributos[indicie].valor ){
          this.resultadoPlacar = "Venceu a Rodada";
          if(placar){
            placar.style.display= 'flex';
            placar.style.background = '#43FF78'
          }
        }else{
          this.resultadoPlacar = "Perdeu a Rodada";
          if(placar){
            placar.style.display= 'flex';
            placar.style.background = '#FF434E'
          }
        }
      }
    },1500)

  }

  clearPlacar(){
    var placar = document.querySelector('.placar') as HTMLElement;

    if(placar){
      placar.style.display = 'none';
    }
  }

  encontrarIndiceDoMelhorAtributo(carta: any): number {
    let indiceDoMelhorAtributo = 0;
    let maiorValor = -Infinity;

    for(let i = 0; i < this.deckDoRobo[0].atributos.length; i++) {
      let valorAtributo = this.deckDoRobo[0].atributos[i].valor;

      if (valorAtributo > maiorValor) {
        maiorValor = valorAtributo;
        indiceDoMelhorAtributo = i;
      }
    }


    return indiceDoMelhorAtributo;
  }

  duelo(indicie:any){
    if(indicie !== undefined){
      if(this.deckDoJogardor.length !== 0){
        this.animation = 'bot-card';
        this.displayRobo = 'block';
      }
      this.varificaPlacar(indicie);
      setTimeout(() => {
        if(this.deckDoJogardor[0].indice == "S10" || this.deckDoRobo[0].indice == "S10"){
          this.tratamentoTrunfo();
        }
        else{
          if(this.deckDoJogardor[0].atributos[indicie].valor > this.deckDoRobo[0].atributos[indicie].valor){
            this.jogadorVenceRodada();
            this.jogadorVencedor = 'block';
          }else{
            this.roboVenceRodada();
            this.botVencedor = 'block';
          }
        }

        if(this.jogadorVencedor != 'none'){
          this.displayRobo = 'none';
          this.animation = '';
          this.jogadorVencedor = 'none';
          this.botVencedor = 'none';
        }

        this.clearPlacar();
        this.resetEvent.emit(true);
        this.atributoName = '';
      }, 4000);
    }
  }
}

