import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobService,Job } from '../service/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
})
export class JobListComponent implements OnInit{
jobs: Job[]=[];

constructor(private jobService: JobService, private cdr: ChangeDetectorRef, private router:Router){}

ngOnInit(){
  this.jobService.jobs$.subscribe((jobs)=>{
    console.log('Emplois reçus par la liste :', jobs);
    this.jobs=jobs;
    this.cdr.detectChanges(); // Forcer la détection des changements
  });
}

deleteJob(index: number){
  if(confirm('voulez-vous vraiment supprimer cet emploi?')){
    this.jobService.deleteJob(index);
  }
}

editJob(index:number){
  this.router.navigate(['/jobs/edit', index]);//page dedition d'un emploi
}

addJob(){
  this.router.navigate(['jobs/new']);//page de creation
}
}
