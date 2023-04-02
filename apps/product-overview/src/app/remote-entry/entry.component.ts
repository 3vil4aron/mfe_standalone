import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TasksFacade } from '@cpx-mfe/task';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FoodsFacade } from '@cpx-mfe/food';

@Component({
  standalone: true,
  providers: [
    // TasksFacade
  ],
  imports: [
    CommonModule,
    NxWelcomeComponent,
  ],
  selector: 'cpx-mfe-product-overview-entry',
  template: `{{ selectedTasks$ | async | json }} {{ allFoods$ | async | json }}`,
})
export class RemoteEntryComponent {
  selectedTasks$ = this.tasks.selectedTasks$;
  allFoods$ = this.foods.allFoods$

  constructor(private tasks: TasksFacade, private foods: FoodsFacade) {
    this.tasks.selectId(1);
    this.tasks.init();
    this.foods.init();
    this.foods.allFoods$
  }
}
