import { Action } from '@ngrx/store';

import * as FoodsActions from './foods.actions';
import { FoodsEntity } from './foods.models';
import { FoodsState, initialFoodsState, foodsReducer } from './foods.reducer';

describe('Foods Reducer', () => {
  const createFoodsEntity = (id: string, name = ''): FoodsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Foods actions', () => {
    it('loadFoodsSuccess should return the list of known Foods', () => {
      const foods = [
        createFoodsEntity('PRODUCT-AAA'),
        createFoodsEntity('PRODUCT-zzz'),
      ];
      const action = FoodsActions.loadFoodsSuccess({ foods });

      const result: FoodsState = foodsReducer(initialFoodsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = foodsReducer(initialFoodsState, action);

      expect(result).toBe(initialFoodsState);
    });
  });
});
