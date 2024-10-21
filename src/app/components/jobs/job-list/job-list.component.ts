import { Component,OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadJobs } from "src/app/ngrx/job.actions";
import { Observable } from "rxjs";
import { JobState } from "src/app/ngrx/job.reducer";
import { Router } from "@angular/router";
import { Job } from "src/app/ngrx/job.model";
import * as bootstrap from 'bootstrap';
import { deleteJob } from "src/app/ngrx/job.actions";


@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
  // styleUrls:['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  jobToDeleteIndex: number | null=null;

  constructor(private store:Store<{jobs: JobState }>, private router: Router){
    
  }

  ngOnInit() {
    //charger le job au demarage
    this.jobs$ =this.store.select(state =>state.jobs.jobs);//selection du jobs depuis le stock NGRX
    this.store.dispatch(loadJobs());//Declanche l'action pour charger les jobs
  }

  //Editer un job
  editJob(index:number){
    console.log('Edit job at index', index);
    this.router.navigate(['jobs/edit', index]);
  }

  //ouvrir le modal pour la suppression
  openDeleteModal(index: number){
    this.jobToDeleteIndex =index;
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
      this.store.dispatch(deleteJob({index: this.jobToDeleteIndex}));
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
}
