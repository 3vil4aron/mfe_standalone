import { createAction, props } from '@ngrx/store';
import { TasksEntity } from './tasks.models';

export const initTasks = createAction('[Tasks Page] Init');

export const loadTasksSuccess = createAction(
  '[Tasks/API] Load Tasks Success',
  props<{ tasks: TasksEntity[] }>()
);

export const loadTasksFailure = createAction(
  '[Tasks/API] Load Tasks Failure',
  props<{ error: any }>()
);

export const selectedTask = createAction(
  '[Tasks/API] Selected Task',
  props<{ taskId: number }>()
);
