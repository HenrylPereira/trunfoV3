import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-temas',
  templateUrl: './menu-temas.component.html',
  styleUrls: ['./menu-temas.component.scss']
})
export class MenuTemasComponent implements OnInit {

  public loading =  false;

  public backgroundImage: string = "url('https://w0.peakpx.com/wallpaper/916/847/HD-wallpaper-homem-aranha-filmes-herois-homem-aranha-marvel-spider-man.jpg')";
  public bckColor = "#69007351";
  public tema = "herois";

  public cards = [
    {
      cardImage: 'https://imgur.com/55Wl0dX.png',
      backgroundImage: 'https://w0.peakpx.com/wallpaper/916/847/HD-wallpaper-homem-aranha-filmes-herois-homem-aranha-marvel-spider-man.jpg',
      tema: 'herois',
      color:"#69007351",
      id: 1
    },
    {
      cardImage: 'https://imgur.com/DCHUcKG.png',
      backgroundImage: 'https://imgur.com/NK7CsyN.png',
      tema: 'carros',
      color:"#73001051",
      id: 2
    },
    {
      cardImage: 'https://imgur.com/ohRLf7M.png',
      backgroundImage: 'https://pbs.twimg.com/media/EtdjOCrXAAgn9bd.jpg',
      tema: 'futebol',
      color:"#00733051",
      id: 3
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loading = true
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  changeTheme(card: any) {
    this.backgroundImage = `url(${card.backgroundImage})`;
    this.bckColor = card.color;
    this.tema = card.tema;
  }

  public selecionar(){
    this.router.navigateByUrl(`/mesa/${this.tema}`)
  }

}
