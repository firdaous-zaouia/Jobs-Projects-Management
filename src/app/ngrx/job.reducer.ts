import { createReducer, on } from "@ngrx/store";
import { Job } from "./job.model";
import { addJob, addJobSuccess, deleteJob, loadJobs, loadJobsSuccess, updateJob } from "./job.actions";
import { state } from "@angular/animations";

export interface JobState {
  jobs: Job[];
}

export const initialState: JobState = {
  jobs: [],
};

export const jobReducer = createReducer(
  initialState,
  //charge les emplois depuis local storage
  on(loadJobsSuccess, (state, { jobs }) => {
    console.log("Réduction de loadJobsSuccess avec jobs: ", jobs); 
    return {
      ...state,
      jobs: Array.isArray(jobs) ? jobs : []
    };
  }),
  // ajouter un nouveau emploi
  on(addJob, (state, {job}) =>
  ({
    ...state,
    jobs: [...state.jobs, job]
  })),
  // Mettre a jour un emploi
  on(updateJob, (state, { id, job }) => ({
      ...state,
      jobs: state.jobs.map(p =>
        p.id === id ? {...p, ...job }:
        p),
    })),
    //Supprimer un emploi
  on(deleteJob, (state, { id }) => ({
    ...state,
    jobs: state.jobs.filter(p => p.id !== id)
  }))
);
