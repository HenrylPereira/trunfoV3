import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cardApi } from '../api/service/card-service';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public loading = true;

  constructor(private router:Router, private _cardApi:cardApi) {

   }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    this._cardApi.getAllCards()
                 .subscribe(
                  (response) => { console.log(response)},
                  (error) => { console.log(error) }
                 );
  }

  navigateToMesa(){
    this.router.navigate(['temas']);
  }

  openModal(){
    const openModalBtn = document.getElementById("openModalBtn");
    const modalBackground = document.getElementById("modalBackground");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("closeModalBtn");

      openModalBtn!.addEventListener("click", () => {
      modalBackground!.style.display = "block";
    });

      closeModalBtn!.addEventListener("click", () => {
      modalBackground!.style.display = "none";
    });
  }

}
