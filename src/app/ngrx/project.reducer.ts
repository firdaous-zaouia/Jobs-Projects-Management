import { createReducer, on } from "@ngrx/store";
import { Project } from "./project.model";  
import {addProject, updateProject, deleteProject, loadProjectsSuccess} from './project.action';
import { LocalStorageService } from "../service/local-storage.service";
import { state } from "@angular/animations";


export interface ProjectState {
    projects: Project[];
}

const initialState: ProjectState = {
    projects: []
   
};

export const projectReducer = createReducer(
    initialState,
    on(loadProjectsSuccess, (state, { projects }) => {
        console.log('Réduction de loadProjectsSuccess avec projets:', projects);
        return{
        ...state,
        projects};
    }),
    
    on(addProject, (state, { project }) => ({
          ...state,
          projects: [...state.projects, project]
      })),

    on(updateProject, (state, { id, project }) => ({
        ...state,
        projects: state.projects.map(p => p.id === id ? {...p, ...project }: p),
    })),

    on(deleteProject,(state, { id }) => ({
        ...state,
        projects: state.projects.filter(p=> p.id !== id)
    }))
);