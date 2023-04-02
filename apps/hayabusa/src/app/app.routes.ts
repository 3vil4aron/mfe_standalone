import { Route } from '@angular/router';
import { FOODS_FEATURE_KEY, FoodsEffects, FoodsFacade, foodsReducer } from '@cpx-mfe/food';
import { TASKS_FEATURE_KEY, TasksEffects, TasksFacade, tasksReducer } from '@cpx-mfe/task';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { loadRemoteModule } from '@nrwl/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'overview',
    providers: [
      provideState(TASKS_FEATURE_KEY, tasksReducer),
      provideEffects([TasksEffects]),
      TasksFacade,
    ],
    loadChildren: () =>
      loadRemoteModule('overview', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'product-overview',
    providers: [
      provideState(TASKS_FEATURE_KEY, tasksReducer),
      provideState(FOODS_FEATURE_KEY, foodsReducer),
      provideEffects([TasksEffects, FoodsEffects]),
      TasksFacade,
      FoodsFacade,
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
