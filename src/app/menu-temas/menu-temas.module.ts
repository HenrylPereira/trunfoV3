import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTemasComponent } from './menu-temas.component';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [MenuTemasComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [MenuTemasComponent]
})
export class MenuTemasModule { }
