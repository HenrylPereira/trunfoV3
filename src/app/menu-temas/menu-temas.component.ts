import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-temas',
  templateUrl: './menu-temas.component.html',
  styleUrls: ['./menu-temas.component.scss']
})
export class MenuTemasComponent implements OnInit {

  public backgroundImage: string = "url('https://imgur.com/55Wl0dX.png')";

  public cards = [
    {cardImage: 'https://imgur.com/55Wl0dX.png', backgroundImage: 'https://w0.peakpx.com/wallpaper/916/847/HD-wallpaper-homem-aranha-filmes-herois-homem-aranha-marvel-spider-man.jpg', tema: 'heros', id: 1},
    {cardImage: 'https://imgur.com/DCHUcKG.png', backgroundImage: 'https://i.pinimg.com/originals/c8/fc/0e/c8fc0e6a7e5745fab7531699e8a30fad.jpg', tema: 'cars', id: 2},
    {cardImage: 'https://imgur.com/ohRLf7M.png', backgroundImage: 'https://imgur.com/ohRLf7M.png', tema: 'soccer', id: 3}
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  changeTheme(src: string) {
    this.backgroundImage = `url(${src})`;
  }

  public selecionar(){
    this.router.navigateByUrl('/mesa')
  }

}
