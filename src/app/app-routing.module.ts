import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesaComponent } from './mesa/mesa.component';
import { MenuTemasComponent } from './menu-temas/menu-temas.component';

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
  },
  {
    path: 'temas',
    component: MenuTemasComponent,
    loadChildren: () => import('./menu-temas/menu-temas.module').then((m) => m.MenuTemasModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
