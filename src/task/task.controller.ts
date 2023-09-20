import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { extractJwtToken } from 'src/utilities/utility';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create-task')
  create(
    @Headers('authorization') authorization: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskDto> {
    extractJwtToken(authorization);
    return this.taskService.create(createTaskDto);
  }

  @Get('list-tasks')
  findAll(@Headers('authorization') authorization: string) {
    extractJwtToken(authorization);
    return this.taskService.getAllTasks();
  }
}
