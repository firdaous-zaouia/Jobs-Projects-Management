import { createAction, props } from "@ngrx/store";
import { Project } from "./project.model";

// Action pour charger les projets
export const loadProjects = createAction('[Project List] Load Projects');
export const loadProjectsSuccess = createAction('[Project List] Load Projects Success', props<{ projects: Project[] }>());
export const loadProjectsFailure = createAction('[Project List] Load Projects Failure', props<{ error: string }>());

// Action pour ajouter un projet
export const addProject = createAction('[Project Form] Add Project', props<{ project: Project }>());
export const addProjectSuccess = createAction('[Project List] Add Project Success', props<{ project: Project }>());
export const addProjectFailure = createAction('[Project List] Add Project Failure', props<{ error: string }>());

// Action pour mettre à jour un projet
export const updateProject = createAction('[Project Form] Update Project', props<{ id: string; project: Project }>());

// Action pour supprimer un projet
export const deleteProject = createAction('[Project List] Delete Project', props<{ id: string }>());
