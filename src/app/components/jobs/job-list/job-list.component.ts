import { Component,OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadJobs, deleteJob } from "src/app/ngrx/job.actions";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Job } from "src/app/ngrx/job.model";
import * as bootstrap from 'bootstrap';
import { AppState } from "src/app/shard/app.state";


@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
})
export class JobListComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  jobToDeleteIndex: string | null=null;

  constructor(private store: Store<AppState>, private router: Router)
  {
    this.jobs$ = this.store.select(state => state.jobState.jobs)
    
  }

  ngOnInit() {
    this.jobs$.subscribe(jobs => {
      console.log('Emplois chargs depuis le store:', jobs);
      
    })
  }

  //Editer un job
  editJob(id: string){
    console.log('Edit job at index', id);
    this.router.navigate(['jobs/edit', id]);
  }

  //ouvrir le modal pour la suppression
  openDeleteModal(id: string){
    this.jobToDeleteIndex =id;
    const modalElement = document.getElementById('confirmDeleteModal');
    if(modalElement){
      const modal=new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  //confirmer la supresssion
  confirmDelete(){
    if(this.jobToDeleteIndex !== null){
      console.log('Confirm deletion for job at index:', this.jobToDeleteIndex);
      this.store.dispatch(deleteJob({id: this.jobToDeleteIndex}));
      this.jobToDeleteIndex = null;

      const modalElement=document.getElementById('confirmDeleteModal');
      if(modalElement !== null){
        const modal=bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    }
  }
  addJob(){
    this.router.navigate(['jobs/new']);
  }
  returnHomePage(){
    this.router.navigate(['']);
  }
}
