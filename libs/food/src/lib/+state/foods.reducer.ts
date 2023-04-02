import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FoodsActions from './foods.actions';
import { FoodsEntity } from './foods.models';

export const FOODS_FEATURE_KEY = 'foods';

export interface FoodsState extends EntityState<FoodsEntity> {
  selectedId?: string | number; // which Foods record has been selected
  loaded: boolean; // has the Foods list been loaded
  error?: string | null; // last known error (if any)
}

export interface FoodsPartialState {
  readonly [FOODS_FEATURE_KEY]: FoodsState;
}

export const foodsAdapter: EntityAdapter<FoodsEntity> =
  createEntityAdapter<FoodsEntity>();

export const initialFoodsState: FoodsState = foodsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialFoodsState,
  on(FoodsActions.initFoods, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FoodsActions.loadFoodsSuccess, (state, { foods }) =>
    foodsAdapter.setAll(foods, { ...state, loaded: true })
  ),
  on(FoodsActions.loadFoodsFailure, (state, { error }) => ({ ...state, error }))
);

export function foodsReducer(state: FoodsState | undefined, action: Action) {
  return reducer(state, action);
}
