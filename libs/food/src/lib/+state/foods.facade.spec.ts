import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as FoodsActions from './foods.actions';
import { FoodsEffects } from './foods.effects';
import { FoodsFacade } from './foods.facade';
import { FoodsEntity } from './foods.models';
import {
  FOODS_FEATURE_KEY,
  FoodsState,
  initialFoodsState,
  foodsReducer,
} from './foods.reducer';
import * as FoodsSelectors from './foods.selectors';

interface TestSchema {
  foods: FoodsState;
}

describe('FoodsFacade', () => {
  let facade: FoodsFacade;
  let store: Store<TestSchema>;
  const createFoodsEntity = (id: string, name = ''): FoodsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FOODS_FEATURE_KEY, foodsReducer),
          EffectsModule.forFeature([FoodsEffects]),
        ],
        providers: [FoodsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(FoodsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allFoods$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allFoods$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadFoodsSuccess` to manually update list
     */
    it('allFoods$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allFoods$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        FoodsActions.loadFoodsSuccess({
          foods: [createFoodsEntity('AAA'), createFoodsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allFoods$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
