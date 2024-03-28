import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './pages/eventos/eventos.component';
import { EventoIdComponent } from './pages/evento-id/evento-id.component';

const routes: Routes = [
  { path:'', component:EventosComponent}, //Pagina principal
  { path:'eventos', component:EventosComponent},
  { path:'evento/:id', component:EventoIdComponent}, //Pagina por id
  { path:'**', pathMatch:'full', redirectTo:'eventos'} //Pagina default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
