import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTemasComponent } from './menu-temas.component';
import { CardModule } from '../card/card.module';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [MenuTemasComponent],
  imports: [
    CommonModule,
    CardModule,
    LoadingModule
  ],
  exports: [MenuTemasComponent]
})
export class MenuTemasModule { }
