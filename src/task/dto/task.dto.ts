import { Task } from '../entities/task.entity';

export class CreateTaskDto {
  name: string;
}

export class TaskDto {
  id: number;
  name: string;

  constructor(task: Task) {
    this.id = task.id;
    this.name = task.name;
  }
}
