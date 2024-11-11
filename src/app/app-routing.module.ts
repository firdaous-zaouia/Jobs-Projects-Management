import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobFormComponent } from "./components/jobs/job-form/job-form.component";
import { JobListComponent } from "./components/jobs/job-list/job-list.component";
import { ProjectFormComponent } from "./components/projects/project-form/project-form.component";
import { ProjectListComponent } from "./components/projects/project-list/project-list.component";
import { HomeComponent } from "./components/home/home.component";


const routes: Routes = [
  // { path: "jobs", component: JobListComponent }, //Page de Liste des emplois
  // { path: "projects", component: ProjectListComponent},
  // { path: "jobs/new", component: JobFormComponent }, //Page de creation d'un emploi
  // { path: "jobs/edit/:id", component: JobFormComponent }, //page d'edition de d'emploi
  // {path:"projects/edit/:id", component:ProjectFormComponent}, //page d'edition de projet
  // { path: "projects/new", component: ProjectFormComponent},//Page de Cretion d'un projet
  // { path: "", redirectTo: "/projects/new", pathMatch: "full" }, //redirection par defaut vers la liste des projets

  { path: "", component: HomeComponent }, // Page d'accueil par défaut
  { path: "jobs", component: JobListComponent }, // Page de liste des emplois
  { path: "projects", component: ProjectListComponent }, // Page de liste des projets
  { path: "jobs/new", component: JobFormComponent }, // Page de création d'un emploi
  { path: "jobs/edit/:id", component: JobFormComponent }, // Page d'édition d'un emploi
  { path: "projects/edit/:id", component: ProjectFormComponent }, // Page d'édition d'un projet
  { path: "projects/new", component: ProjectFormComponent }, // Page de création d'un projet


  { path: "**", redirectTo: "" }, //Redirection pour les route inconue vers la page d'acceuille
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
