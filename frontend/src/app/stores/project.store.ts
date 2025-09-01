import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, Client, ProjectState } from '../models/project';
import { tap, catchError, of } from 'rxjs';

const initialState: ProjectState = {
  projects: [],
  clients: [],
  loading: false,
  error: null,
};

export const ProjectStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, projectService = inject(ProjectService)) => ({
    loadProjects() {
      patchState(store, { loading: true, error: null });
      return projectService.getProjects().pipe(
        tap((projects: Project[]) => {
          patchState(store, { projects, loading: false });
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of([]);
        })
      );
    },
    addProject(project: Omit<Project, 'id'>) {
      patchState(store, { loading: true, error: null });
      return projectService.createProject(project).pipe(
        tap((newProject: Project) => {
          patchState(store, (state) => ({
            projects: [...state.projects, newProject],
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    updateProject(id: number, updates: Partial<Project>) {
      patchState(store, { loading: true, error: null });
      return projectService.updateProject(id, updates).pipe(
        tap((updatedProject: Project) => {
          patchState(store, (state) => ({
            projects: state.projects.map((project) =>
              project.id === id ? updatedProject : project
            ),
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    deleteProject(id: number) {
      patchState(store, { loading: true, error: null });
      return projectService.deleteProject(id).pipe(
        tap(() => {
          patchState(store, (state) => ({
            projects: state.projects.filter((project) => project.id !== id),
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    loadClients() {
      patchState(store, { loading: true, error: null });
      return projectService.getClients().pipe(
        tap((clients: Client[]) => {
          patchState(store, { clients, loading: false });
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of([]);
        })
      );
    },
    addClient(client: Omit<Client, 'id'>) {
      patchState(store, { loading: true, error: null });
      return projectService.createClient(client).pipe(
        tap((newClient: Client) => {
          patchState(store, (state) => ({
            clients: [...state.clients, newClient],
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    updateClient(id: number, updates: Partial<Client>) {
      patchState(store, { loading: true, error: null });
      return projectService.updateClient(id, updates).pipe(
        tap((updatedClient: Client) => {
          patchState(store, (state) => ({
            clients: state.clients.map((client) =>
              client.id === id ? updatedClient : client
            ),
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    deleteClient(id: number) {
      patchState(store, { loading: true, error: null });
      return projectService.deleteClient(id).pipe(
        tap(() => {
          patchState(store, (state) => ({
            clients: state.clients.filter((client) => client.id !== id),
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
  })),
  withComputed((store) => ({
    totalProjects: () => store.projects().length,
    totalClients: () => store.clients().length,
    isLoading: () => store.loading(),
    hasError: () => !!store.error(),
  }))
);
