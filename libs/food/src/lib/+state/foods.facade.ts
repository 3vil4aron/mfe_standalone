import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as FoodsActions from './foods.actions';
import * as FoodsFeature from './foods.reducer';
import * as FoodsSelectors from './foods.selectors';

@Injectable()
export class FoodsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(FoodsSelectors.selectFoodsLoaded));
  allFoods$ = this.store.pipe(select(FoodsSelectors.selectAllFoods));
  selectedFoods$ = this.store.pipe(select(FoodsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(FoodsActions.initFoods());
  }
}
