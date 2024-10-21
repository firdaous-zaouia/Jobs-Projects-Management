import { Injectable } from "@angular/core";
import {of} from 'rxjs';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { JobService } from "../service/job.service";
import { addJob, addJobSuccess, loadJobs, loadJobsSuccess } from "./job.actions";
import { catchError, mergeMap, map} from "rxjs";
import { Job } from "./job.model";

@Injectable()
export class JobEffects{
    constructor(private action$: Actions, private jobService: JobService){}

    //Effet pour charger les emplois
    loadJobs$ = createEffect(() =>
    this.action$.pipe(
        ofType(loadJobs),
        mergeMap(() =>
        this.jobService.getJobs().pipe(
            map((jobs: Job[]) => loadJobsSuccess({jobs})),
            catchError((error)=> of({type:'[Job] Load Jobs Failure', error}))
            )
        )
    ));

    //Effet pour ajouter un emploi
    addJobs$ =createEffect(()=>
    this.action$.pipe(
        ofType(addJob),
            mergeMap((action) =>
                this.jobService.addJob(action.job).pipe(
                    map((job:Job)=> addJobSuccess({job})),
            catchError((error) => of({type: '[Job] Add Job Failure',
                error }))
        )))
    );}
