import { Route } from '@angular/router';
import { TASKS_FEATURE_KEY, TasksEffects, TasksFacade, tasksReducer } from '@cpx-mfe/task';
import { FOODS_FEATURE_KEY, FoodsEffects, FoodsFacade, foodsReducer} from '@cpx-mfe/food'
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';


export const appRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideState(TASKS_FEATURE_KEY, tasksReducer),
      provideState(FOODS_FEATURE_KEY, foodsReducer),
      provideEffects([TasksEffects, FoodsEffects]),
      TasksFacade,
      FoodsFacade,
    ],
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  {
    path: '**',
    redirectTo: ''
  }
];