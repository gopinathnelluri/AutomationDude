import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RpasComponent } from './rpas/rpas.component';
import { RunnersComponent } from './runners/runners.component';

const routes: Routes = [
  { path: 'runners', component: RunnersComponent },
  { path: 'rpas', component: RpasComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
