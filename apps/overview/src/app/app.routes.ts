import { Route } from '@angular/router';
// import { TasksFacade } from '@cpx-mfe/task';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [
      // TasksFacade
    ],
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  {
    path: '**',
    redirectTo: ''
  }
];