import { createAction, props } from '@ngrx/store';
import { FoodsEntity } from './foods.models';

export const initFoods = createAction('[Foods Page] Init');

export const loadFoodsSuccess = createAction(
  '[Foods/API] Load Foods Success',
  props<{ foods: FoodsEntity[] }>()
);

export const loadFoodsFailure = createAction(
  '[Foods/API] Load Foods Failure',
  props<{ error: any }>()
);
