import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { addProject, updateProject, deleteProject, loadProjects, loadProjectsSuccess } from './project.action';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../service/local-storage.service';
import { AppState } from '../shard/app.state';
import { Project } from './project.model';

@Injectable()
export class ProjectEffects {
    constructor(
        private actions$: Actions,
        private localStorageService: LocalStorageService,
        private store: Store<AppState>
    ) {}

    // Charger les projets depuis le LocalStorage lors de l'initialisation
    loadProjects$ = createEffect(() => 
        this.actions$.pipe(
        ofType(loadProjects),
        map(() => {
            const projects = this.localStorageService.getData<Project[]>('projects') || [];
            console.log('Données chargées depuis localStorage:', projects); 
            return loadProjectsSuccess({ projects});
        })
    ));

    //Sauvegarder les Projets dans le local storage apres chaque modification
    saveProjects$ = createEffect(
        () => 
            this.actions$.pipe(
            ofType(addProject, updateProject, deleteProject),
            tap(() => {
                this.store
                .select(state => state.projectState.projects)
                    .subscribe(projects => {
                        console.log('Sauvegarde des projets dans localStorage:', projects); // Vérification
                        this.localStorageService.saveData('projects', projects);
                    });
            })
        ),
        { dispatch: false }
    );
}
