import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as FoodsActions from './foods.actions';
import { FoodsEffects } from './foods.effects';

describe('FoodsEffects', () => {
  let actions: Observable<Action>;
  let effects: FoodsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FoodsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(FoodsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FoodsActions.initFoods() });

      const expected = hot('-a-|', {
        a: FoodsActions.loadFoodsSuccess({ foods: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
