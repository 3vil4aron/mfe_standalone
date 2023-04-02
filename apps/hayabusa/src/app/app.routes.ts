import { Route } from '@angular/router';
import { TASKS_FEATURE_KEY, TasksEffects, TasksFacade, tasksReducer } from '@cpx-mfe/task';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { loadRemoteModule } from '@nrwl/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'overview',
    loadChildren: () =>
      loadRemoteModule('overview', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'product-overview',
    providers: [
      provideState(TASKS_FEATURE_KEY, tasksReducer),
      provideEffects(TasksEffects),
      TasksFacade,
    ],
    loadChildren: () =>
      loadRemoteModule('product-overview', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./nx-welcome.component').then((c) => c.NxWelcomeComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
