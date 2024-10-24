import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobFormComponent } from "./components/jobs/job-form/job-form.component";
import { JobListComponent } from "./components/jobs/job-list/job-list.component";
import { ProjectFormComponent } from "./components/projects/project-form/project-form.component";


const routes: Routes = [
  { path: "jobs", component: JobListComponent }, //Page de Liste des emplois
  { path: "jobs/new", component: JobFormComponent }, //Page de creation d'un emploi
  { path: "jobs/edit/:id", component: JobFormComponent }, //page d'edition
  { path: "projects/new", component: ProjectFormComponent},//Page de Cretion d'un projet
  { path: "", redirectTo: "/projects/new", pathMatch: "full" }, //redirection par defaut vers la liste des emplois
  // { path: "", redirectTo: "/jobs", pathMatch: "full" }, //redirection par defaut vers la liste des emplois
  { path: "**", redirectTo: "/jobs" }, //Gerer les chemins invalides
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
