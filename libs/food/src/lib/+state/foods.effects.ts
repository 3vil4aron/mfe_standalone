import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as FoodsActions from './foods.actions';
import * as FoodsFeature from './foods.reducer';

import { switchMap, catchError, of } from 'rxjs';

@Injectable()
export class FoodsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodsActions.initFoods),
      switchMap(() => of(FoodsActions.loadFoodsSuccess({ foods: [{id: 1, name: 'hotdog'}] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(FoodsActions.loadFoodsFailure({ error }));
      })
    )
  );
}
