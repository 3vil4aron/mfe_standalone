import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOODS_FEATURE_KEY, FoodsState, foodsAdapter } from './foods.reducer';

// Lookup the 'Foods' feature state managed by NgRx
export const selectFoodsState =
  createFeatureSelector<FoodsState>(FOODS_FEATURE_KEY);

const { selectAll, selectEntities } = foodsAdapter.getSelectors();

export const selectFoodsLoaded = createSelector(
  selectFoodsState,
  (state: FoodsState) => state.loaded
);

export const selectFoodsError = createSelector(
  selectFoodsState,
  (state: FoodsState) => state.error
);

export const selectAllFoods = createSelector(
  selectFoodsState,
  (state: FoodsState) => selectAll(state)
);

export const selectFoodsEntities = createSelector(
  selectFoodsState,
  (state: FoodsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectFoodsState,
  (state: FoodsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectFoodsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
