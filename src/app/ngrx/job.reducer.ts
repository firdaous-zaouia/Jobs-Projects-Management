import { createReducer, on } from "@ngrx/store";
import { Job } from "./job.model";
import { addJobSuccess, deleteJob, loadJobs, loadJobsSuccess } from "./job.actions";

export interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

export const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null,
};

export const jobReducer = createReducer(
  initialState,
  on(loadJobs, (state) => {
    console.log("Loading jobs from localStorage...");
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadJobsSuccess, (state, { jobs }) => {
    const loadedJobs = jobs && jobs.length ? jobs : state.jobs;
    console.log("Jobs loaded from localStorage: ", loadedJobs); // Log des jobs récupérés
    return {
      ...state,
      jobs: loadedJobs, // S'assurer qu'on récupère bien les jobs
      loading: false,
    };
  }),
  on(addJobSuccess, (state, { job }) => {
    const updatedJobs = [...state.jobs, job];
    localStorage.setItem('jobs', JSON.stringify({ jobs: updatedJobs })); // Mettre à jour localStorage
    console.log('New job added and saved to localStorage: ', updatedJobs);
    return {
      ...state,
      jobs: updatedJobs,
      loading: false,
    };
  }),
  on(deleteJob, (state, { index }) => {
    const updatedJobs = state.jobs.filter((_, i) => i !== index);
    localStorage.setItem('jobs', JSON.stringify({ jobs: updatedJobs })); // Mettre à jour localStorage après suppression
    console.log('Job deleted and updated in localStorage: ', updatedJobs);
    return {
      ...state,
      jobs: updatedJobs,
    };
  })
);
