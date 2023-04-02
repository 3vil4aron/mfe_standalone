import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TasksFacade } from '@cpx-mfe/task';
import { NxWelcomeComponent } from './nx-welcome.component';

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
  template: `{{ selectedTasks$ | async | json }}`,
})
export class RemoteEntryComponent {
  selectedTasks$ = this.tasks.selectedTasks$
  constructor(private tasks: TasksFacade) {
    this.tasks.selectId(2);
    this.tasks.init();
  }
}