import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { JobFormComponent } from "./components/jobs/job-form/job-form.component";
import { ProjectFormComponent } from "./components/projects/project-form/project-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { JobListComponent } from "./components/jobs/job-list/job-list.component";
import { StoreModule, MetaReducer } from "@ngrx/store";
import { jobReducer } from "./ngrx/job.reducer";
import { EffectsModule } from "@ngrx/effects";
import { JobEffects } from "./ngrx/job.effects";
import { localStorageSync } from "ngrx-store-localstorage";

// Fonction pour synchroniser et réhydrater le store depuis localStorage
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['jobs'], // On synchronise uniquement 'jobs'
    rehydrate: true, // On réhydrate à partir du localStorage
    storageKeySerializer: (key: string) => key, // S'assurer que la clé est correcte
  })(reducer);
}

// Déclaration du MetaReducer pour réhydrater depuis localStorage
const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer]; // Ajoutez le localStorageSyncReducer ici

@NgModule({
  declarations: [AppComponent, JobFormComponent, JobListComponent, ProjectFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ jobs: jobReducer }, { metaReducers }), // Utilisation du MetaReducer
    EffectsModule.forRoot([JobEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
