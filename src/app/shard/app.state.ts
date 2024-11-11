import { ProjectState } from "../ngrx/project.reducer";
import { JobState } from "../ngrx/job.reducer";

export interface AppState {
    projectState: ProjectState;
    jobState: JobState;
}