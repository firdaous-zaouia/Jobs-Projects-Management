import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Job } from "../ngrx/job.model";

@Injectable({
  providedIn: "root",
})
export class JobService {
private jobs:Job[] = [];

getJobs(): Observable<Job[]>{
  return of(this.jobs);
}

addJob(job: Job):Observable<Job>{
  this.jobs = [...this.jobs, job];
  return of(job);
}
}
