import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.name = createTaskDto.name;
    await this.taskRepository.save(task);
    return task;
  }

  async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.find();
    const taskDtos = tasks.map((task) => new TaskDto(task));
    return taskDtos;
  }
}
