import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
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

  public displayRobo = 'none';
  public animation = '';
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
  public resultadoPlacar!: String;
  public atributoMaisForteDaCarta!:number;
  public indicieDoMelhorAtributoRobo!: number;
  public atributoName = 'Força';
  public disabled = false;

	constructor(private router:Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tema = params.get('tema');
      this.selecionarTema(params.get('tema'));
    });
    this.destribuirBaralhos();
    this.cartasBatalhando();
    this.pegarClicknoBotaoJogarNovamente();
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

    for(let i = 0; i <= 3; i ++){ //era 7 tem que ser a metade
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
    if (this.jogadorVencedor == 'none') { // verifica se o jogador perdeu a rodada anterior

      const indiceDoMelhorAtributoRobo = this.encontrarIndiceDoMelhorAtributo(this.deckDoRobo[0]);

      this.duelo(indiceDoMelhorAtributoRobo); // chama o método de duelo novamente com o índice do atributo mais forte do robô
    }

    const botaoDuelo = document.querySelector('.play-btn') as HTMLElement;

    if (botaoDuelo) {
      botaoDuelo.style.display = 'none';
    }

    this.cartasDaRodada();

    this.verificaQtdCartas();
    this.deckDoRobo.push(this.primeiraCartaJogador);
    this.deckDoRobo.push(this.primeiraCartaRobo);
    this.cartasBatalhando();
    console.log("Robo venceu");
    console.log(this.deckDoJogardor);
    console.log(this.deckDoRobo)
  }

  jogadorVenceRodada(){
    const botaoDuelo = document.querySelector('.play-btn') as HTMLElement;

    if (botaoDuelo) {
      botaoDuelo.style.display = 'block';
    }

    this.cartasDaRodada();

    this.deckDoJogardor.push(this.primeiraCartaRobo);
    this.deckDoJogardor.push(this.primeiraCartaJogador);
    this.cartasBatalhando()
    console.log("Jogador venceu");

    console.log(this.deckDoJogardor);
    console.log(this.deckDoRobo)
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
    console.log("teste")
    this.router.navigate(['menu']);
  }

  roboVencedorDaPartida(){
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
    console.log("robo venceu");
  }

  jogadorVencedorDaPartida(){
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
    console.log("jogador venceu");
  }

  verificaQtdCartas(){

    if(this.deckDoRobo.length == 0 || this.deckDoJogardor.length == 0){
      if(this.deckDoJogardor.length == 0 ) {
        this.roboVencedorDaPartida();
      }else{
        this.jogadorVencedorDaPartida();
      }
    }
  }

  tratamentoTrunfo(){
    if((this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A") || (this.deckDoRobo[0].indice == "S10" && this.deckDoJogardor[0].indice.substring(0,1) == "A")){
      console.log("TRUNFO PERDEU");
      if(this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A"){
        this.roboVenceRodada();

      }else{
        this.jogadorVenceRodada();
      }
    }else{
      console.log("TRUNFO VENCEU A RODADA");
      if(this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) != "A"){
        this.jogadorVenceRodada();
      }
      if(this.deckDoRobo[0].indice == "S10" && this.deckDoJogardor[0].indice.substring(0,1) != "A"){
        this.roboVenceRodada();
        if (this.jogadorVencedor == 'none') { // verifica se o jogador perdeu a rodada anterior

          const indiceDoMelhorAtributoRobo = this.encontrarIndiceDoMelhorAtributo(this.deckDoRobo[0]);

          this.duelo(indiceDoMelhorAtributoRobo); // chama o método de duelo novamente com o índice do atributo mais forte do robô
        }
      }
    }
  }

  varificaPlacar(indicie:any){
    setTimeout(() => {
      var placar = document.querySelector('.placar') as HTMLElement;

      if(this.deckDoJogardor[0].indice == "S10" || this.deckDoRobo[0].indice == "S10"){
        if((this.deckDoJogardor[0].indice == "S10" && this.deckDoRobo[0].indice.substring(0,1) == "A") || (this.deckDoRobo[0].indice == "S10" && this.deckDoJogardor[0].indice.substring(0,1) == "A")){
          console.log("TRUNFO PERDEU");
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
          console.log("TRUNFO VENCEU A RODADA");
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
    console.log("________")
    console.log(maiorValor)

    return indiceDoMelhorAtributo;
  }

  duelo(indicie:any){
    console.log(indicie)
    this.displayRobo = 'block';
    this.animation = 'bot-card';
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
    }, 4000);
    console.log("robo chamou")
  }
}

