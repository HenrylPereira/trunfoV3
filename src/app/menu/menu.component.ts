import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public loading = true;
  
  constructor(private router:Router) {

   }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
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
