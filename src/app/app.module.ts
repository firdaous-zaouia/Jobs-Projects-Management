import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { JobFormComponent } from "./components/jobs/job-form/job-form.component";
import { ProjectFormComponent } from "./components/projects/project-form/project-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { JobListComponent } from "./components/jobs/job-list/job-list.component";
import { StoreModule, MetaReducer, ActionReducerMap } from "@ngrx/store";
import { jobReducer } from "./ngrx/job.reducer";
import { projectReducer } from "./ngrx/project.reducer";
import { EffectsModule } from "@ngrx/effects";
import { JobEffects } from "./ngrx/job.effects";
import { ProjectEffects } from "./ngrx/project.effects";
import { localStorageSync } from "ngrx-store-localstorage";
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from "./components/projects/project-list/project-list.component";
import { AppState } from "./shard/app.state";

// Regrouper les reducers dans un objet
const reducers: ActionReducerMap<AppState> = {
  jobState: jobReducer,
  projectState: projectReducer,
};
const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

// Fonction pour créer le MetaReducer avec localStorageSync
export function getMetaReducers(): MetaReducer<any>[] {
  return [
    localStorageSyncReducer
  ];
}

// Fonction pour synchroniser et réhydrater le store depuis localStorage
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['jobState', 'projectState'], 
    rehydrate: true,
  })(reducer);
}

@NgModule({
  declarations: [
    AppComponent, 
    JobFormComponent, 
    JobListComponent, 
    ProjectFormComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers: metaReducers}), 
    EffectsModule.forRoot([JobEffects, ProjectEffects]), 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
