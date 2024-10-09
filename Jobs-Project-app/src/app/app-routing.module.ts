import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobListComponent } from './components/job-list/job-list.component';

const routes: Routes = [
  {path: 'jobs', component:JobListComponent},//Page de Liste des emplois
  { path: 'jobs/new', component:   JobFormComponent},//Page de creation d'un emploi
  {path: 'jobs/edit/:id', component: JobFormComponent},//page d'edition
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },//redirection par defaut vers la liste des emplois
  {path: '**', redirectTo:'/jobs'}//Gerer les chemins invalides
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
