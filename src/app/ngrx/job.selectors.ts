import { createSelector } from '@ngrx/store';
import { JobState } from './job.reducer';
import { Job } from './job.model';

// Sélecteur pour récupérer tous les emplois
export const selectJobs = (state: { jobs: JobState }) => state.jobs.jobs;

// Sélecteur pour récupérer un emploi spécifique par index
export const selectJobByIndex = (index: number) =>
  createSelector(selectJobs, (jobs: Job[]) => jobs[index]);
