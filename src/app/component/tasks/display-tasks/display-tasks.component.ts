import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.css'],
})
export class DisplayTasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  tasks: TaskList[] = [];
  tableData: any[] = [];
  ngOnInit(): void {
    this.tasksService.fetchTasks().subscribe((res) => {
      console.log(res);
      this.tasks = res.taskList;
      this.tableData = res.expiringContractsList;
    });
  }
}

export class TaskList {
  taskType: string;
  taskImage: string;
  taskDescription: string;
}
