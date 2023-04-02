import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFoods from './+state/foods.reducer';
import { FoodsEffects } from './+state/foods.effects';
import { FoodsFacade } from './+state/foods.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromFoods.FOODS_FEATURE_KEY, fromFoods.foodsReducer),
    EffectsModule.forFeature([FoodsEffects]),
  ],
  providers: [FoodsFacade],
})
export class FoodModule {}
