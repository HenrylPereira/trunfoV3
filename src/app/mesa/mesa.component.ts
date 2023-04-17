import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-temas',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss']
})
export class MesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public quantCards = [1,2,3,4,5,6,7,8];

}
