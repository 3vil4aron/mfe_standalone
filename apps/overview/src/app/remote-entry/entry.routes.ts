import { Route } from '@angular/router';
import { TASKS_FEATURE_KEY, TasksEffects, TasksFacade, tasksReducer } from '@cpx-mfe/task';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState(TASKS_FEATURE_KEY, tasksReducer),
      provideEffects(TasksEffects),
      TasksFacade,
    ],
    loadComponent: () => import('./entry.component').then(c => c.RemoteEntryComponent)
  },
];