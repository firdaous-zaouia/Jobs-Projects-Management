import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, mergeMap, map, tap, switchMap } from "rxjs/operators";
import { addJob, deleteJob, loadJobs, loadJobsSuccess, updateJob } from "./job.actions";
import { Job } from "./job.model";
import { LocalStorageService } from "../service/local-storage.service";
import { Store } from "@ngrx/store";
import { state } from "@angular/animations";
import { AppState } from "../shard/app.state";

@Injectable()
export class JobEffects {

  constructor(
    private action$: Actions, 
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
    ) {}

  // Effet pour charger les emplois au démarage
  loadJobs$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadJobs),
      map(() => {
        const jobs = this.localStorageService.getData<Job[]>('jobs') || [];
        console.log('Données chargées depuis localStorage:', jobs); 
        return loadJobsSuccess({ jobs });
      })
    )
  );

  // Effet pour sauvegarger les emplois apres chaque modification
  saveJobs$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(addJob, updateJob, deleteJob),
        switchMap(() => this.store.select(state => state.jobState.jobs)),
        tap((jobs) => {
          console.log('Sauvegarde des emplois dans localStorage:', jobs);
          this.localStorageService.saveData('jobs', jobs);
        })
      ),
    { dispatch: false }
  );
}
