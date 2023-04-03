import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesaComponent } from './mesa.component';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [MesaComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [MesaComponent]
})
export class MesaModule { }
