import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

export const EmployeeData = [
  {
    id: 1,
    name: 'Jeremy Gilbert',
  },
  {
    id: 2,
    name: 'Bonnie Donnavan',
  },
  {
    id: 3,
    name: 'Rebbaca wisely',
  },
  {
    id: 4,
    name: 'Thomas Jaim',
  },
  {
    id: 5,
    name: 'Skyler Hilda',
  },
  {
    id: 6,
    name: 'Victoria Albert',
  },
];

@Component({
  selector: 'app-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.css'],
})
export class DisplayTasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  countries: ICountry[] = [];
  tasks: TaskList[] = [];

  ngOnInit(): void {
    this.tasksService.fetchTasks().subscribe((res) => {
      console.log(res);
      this.tasks = res;
    });
  }
}

export class ICountry {
  name: string;
  flag: string;
  area: number;
  population: number;
  description: string;
}

export class TaskList {
  taskType: string;
  taskImage: string;
  taskDescription: string;
}

// export class TaskList {
//   constructor(
//     taskType: string,
//     taskImage: string,
//     taskDescription: string
//   ) { }
// }
