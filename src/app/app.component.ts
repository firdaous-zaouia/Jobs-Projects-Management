import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProjects } from './ngrx/project.action';
import { loadJobs } from './ngrx/job.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
   constructor(private store:Store) {}

  ngOnInit() {

this.store.dispatch(loadProjects());
this.store.dispatch(loadJobs());// charge les emplois depuis localStorege au demarrage

   }
}
