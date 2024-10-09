import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Job {
  titre: string;
  localisation: string;
  categorie: string;
  description: string;
  dateDebut: string;
  dateFin?: string;
  salaire?: number;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly STORAGE_KEY = 'jobList';//Cle pour Local Storage
  private jobsSubject = new BehaviorSubject<Job[]>(this.loadJobsFromStorage());
  jobs$ = this.jobsSubject.asObservable(); 

  // Méthode pour charger les emplois depuis Local Storage
  private loadJobsFromStorage(): Job[] {
    const storedJobs = localStorage.getItem(this.STORAGE_KEY);
    return storedJobs ? JSON.parse(storedJobs) : [];
  }

   //Sauvegarder les emplois dans Local Storage
   private saveJobsToStorage(jobs: Job[]){
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
  }

  // Ajouter un nouvel emploi
  addJob(job: Job) {
    const currentJobs = this.getJobsValue();
    const updatedJobs = [...currentJobs, job];
    this.jobsSubject.next(updatedJobs);
    this.saveJobsToStorage(updatedJobs); // Sauvegarder dans localStorage
  }

 

  // Mettre à jour un emploi existant
  updateJob(index: number, updatedJob: Job) {
    const jobs = this.getJobsValue();
    jobs[index] = updatedJob;
    this.jobsSubject.next(jobs);
    this.saveJobsToStorage(jobs); // Sauvegarder dans localStorage
  }

  // Supprimer un emploi
  deleteJob(index: number) {
    const jobs = this.getJobsValue();
    jobs.splice(index, 1);
    this.jobsSubject.next(jobs);
    this.saveJobsToStorage(jobs); // Sauvegarder dans localStorage
  }

    // Méthode pour obtenir la valeur actuelle des emplois
    getJobsValue(){
      return this.jobsSubject.getValue(); 
    }
  
}
