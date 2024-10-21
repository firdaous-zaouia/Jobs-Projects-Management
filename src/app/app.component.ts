import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadJobsSuccess } from './ngrx/job.actions';
import { JobState } from './ngrx/job.reducer';
import { Job } from './ngrx/job.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{ jobs: JobState }>) {}

  ngOnInit(): void {
    // Récupérer les données du localStorage manuellement
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      try {
        const parsedJobs: { jobs: Job[] } = JSON.parse(storedJobs);
        if (parsedJobs.jobs && parsedJobs.jobs.length > 0) {
          // Dispatch l'action pour réhydrater l'état NGRX
          this.store.dispatch(loadJobsSuccess({ jobs: parsedJobs.jobs }));
          console.log('Données réhydratées depuis le localStorage :', parsedJobs.jobs);
        }
      } catch (e) {
        console.error('Erreur lors de la lecture des données depuis le localStorage', e);
      }
    }
  }
}
