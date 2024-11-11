import { createAction, props } from "@ngrx/store";
import { Job } from "./job.model";


//Action pour charger les emplois
export const loadJobs = createAction('[Job List] Load Jobs');
export const loadJobsSuccess =createAction('[Job List] Load Jobs Success', props<{jobs: Job[]}>());
export const loadJobsFailure = createAction('[Job List] Load Jobs Failure', props<{error:string}>());

//Action pour ajouter un emploi
export const addJob = createAction('[Job Form] Add Job',
props<{job: Job}>());
export const addJobSuccess = createAction('[Job List] Add Jobs Success', props<{ job:Job}>());
export const addJoFailure = createAction('[Job List] Add Job Failure', props<{error:string}>);

//Action updateJob
export const updateJob = createAction('[Job Form] Update Job',
    props<{id: string; job: Job}>()
);

//Action pour supprimer un emploi
export const deleteJob = createAction(
    '[Job List] Delete Job',
    props<{id: string}>()
);