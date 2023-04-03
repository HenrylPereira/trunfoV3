import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesaComponent } from './mesa/mesa.component';

const routes: Routes = [
  {
    path: '',
    component: MesaComponent,
    children: [
      { path: '', redirectTo: 'mesa', pathMatch: 'full' },
      {
        path: 'mesa',
        loadChildren: () => import('./mesa/mesa.module').then((m) => m.MesaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
