import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from 'src/app/ngrx/project.model';
import { addProject, deleteProject } from 'src/app/ngrx/project.action';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AppState } from 'src/app/shard/app.state';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
})


export class ProjectListComponent implements OnInit{
  projects$: Observable<Project[]>;
  projectToDeleteIndex: string | null=null;

 constructor(private store: Store<AppState>, private route :Router)
 {
  this.projects$ = this.store.select(state => state.projectState.projects);
 } 

 ngOnInit(){
  this.projects$.subscribe(projects => {
    console.log('Projets chargés depuis le store:', projects); // Vérifiez que les projets sont bien transmis
  });
 }

 //Editer un Projet
  edit(id:string){
    console.log('Edit project at index', id);
    this.route.navigate(['projects/edit', id]);
  }

  //ouvrir le modal pour la suppression
  openDeleteModal(id: string){
    this.projectToDeleteIndex =id;
    const modalElement = document.getElementById('confirmDeleteModal');
    if(modalElement){
      const modal=new bootstrap.Modal(modalElement);
      modal.show();
    }}

    //confirmer la supresssion
  confirmDelete(){
    if(this.projectToDeleteIndex !== null){
      console.log('Confirm deletion for job at index:', this.projectToDeleteIndex);
      this.store.dispatch(deleteProject({id: this.projectToDeleteIndex}));
      this.projectToDeleteIndex = null;

      const modalElement=document.getElementById('confirmDeleteModal');
      if(modalElement !== null){
        const modal=bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    }
  }
  addProject(){
    this.route.navigate(['projects/new']);
  }
}
