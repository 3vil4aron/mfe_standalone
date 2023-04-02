import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { TASKS_FEATURE_KEY, TasksEffects, TasksFacade, tasksReducer } from '@cpx-mfe/task'
import { provideState } from '@ngrx/store';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState(TASKS_FEATURE_KEY, tasksReducer),
      provideEffects(TasksEffects),
      TasksFacade,
    ],
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  {
    path: '**',
    redirectTo: ''
  }
];