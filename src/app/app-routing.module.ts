import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {StatsComponent} from './components/stats/stats.component';


const routes: Routes = [
  {path:"",component: HomeComponent},
  {path:"stats/:id",component:StatsComponent},
  {path:"**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
