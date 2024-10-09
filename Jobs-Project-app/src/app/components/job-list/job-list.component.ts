import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobService,Job } from '../service/job.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
})
export class JobListComponent implements OnInit{
jobs: Job[]=[];
jobToDeleteIndex: number | null = null; // Variable pour stocker l'index du job à supprimer

constructor(private jobService: JobService, private cdr: ChangeDetectorRef, private router:Router){}

ngOnInit(){
  this.jobService.jobs$.subscribe((jobs)=>{
    console.log('Emplois reçus par la liste :', jobs);
    this.jobs=jobs;
    this.cdr.detectChanges(); // Forcer la détection des changements
  });
}

openDeleteModal(index: number) {
  this.jobToDeleteIndex = index; // Stocker l'index du job à supprimer
  const modalElement = document.getElementById('confirmDeleteModal');
if (modalElement) {
  const modal = new bootstrap.Modal(modalElement); // Ouvrir la modale
  modal.show();
}
}
confirmDelete() {
  if (this.jobToDeleteIndex !== null) {
    this.jobService.deleteJob(this.jobToDeleteIndex); // Supprimer l'emploi
    this.jobToDeleteIndex = null; // Réinitialiser après suppression

    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement !== null) {
      const modal = bootstrap.Modal.getInstance(modalElement); // Fermer la modale
      modal?.hide(); // Vérification optionnelle si getInstance retourne null
    } else {
      console.error('Element with id "confirmDeleteModal" not found.');
    }
  }
}


editJob(index:number){
  this.router.navigate(['/jobs/edit', index]);//page dedition d'un emploi
}

addJob(){
  this.router.navigate(['jobs/new']);//page de creation
}
}
