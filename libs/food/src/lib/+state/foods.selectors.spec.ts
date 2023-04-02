import { FoodsEntity } from './foods.models';
import {
  foodsAdapter,
  FoodsPartialState,
  initialFoodsState,
} from './foods.reducer';
import * as FoodsSelectors from './foods.selectors';

describe('Foods Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFoodsId = (it: FoodsEntity) => it.id;
  const createFoodsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FoodsEntity);

  let state: FoodsPartialState;

  beforeEach(() => {
    state = {
      foods: foodsAdapter.setAll(
        [
          createFoodsEntity('PRODUCT-AAA'),
          createFoodsEntity('PRODUCT-BBB'),
          createFoodsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialFoodsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Foods Selectors', () => {
    it('selectAllFoods() should return the list of Foods', () => {
      const results = FoodsSelectors.selectAllFoods(state);
      const selId = getFoodsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = FoodsSelectors.selectEntity(state) as FoodsEntity;
      const selId = getFoodsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectFoodsLoaded() should return the current "loaded" status', () => {
      const result = FoodsSelectors.selectFoodsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectFoodsError() should return the current "error" state', () => {
      const result = FoodsSelectors.selectFoodsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
