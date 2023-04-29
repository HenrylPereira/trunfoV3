import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesaComponent } from './mesa.component';
import { CardModule } from '../card/card.module';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [MesaComponent],
  imports: [
    CommonModule,
    CardModule,
    LoadingModule
  ],
  exports: [MesaComponent]
})
export class MesaModule { }
