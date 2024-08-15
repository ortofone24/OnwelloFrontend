import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcandidatesComponent } from './addcandidates/addcandidates.component';
import { AddvotersComponent } from './addvoters/addvoters.component';
import { MainviewComponent } from './mainview/mainview.component';

const routes: Routes = [
  { path: 'addcandidates', component: AddcandidatesComponent },
  { path: 'addvoters', component: AddvotersComponent },
  { path: 'mainview', component: MainviewComponent },
  { path: '', redirectTo: '/addcandidates', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
