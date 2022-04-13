import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.css']
})
export class DisplayTasksComponent implements OnInit {

  constructor(private tasksService: TasksService) {

  }

  countries: ICountry[] = [];
  tasks: TaskList[] = [];

  ngOnInit(): void {

    this.tasksService.fetchTasks().subscribe(res => {
      console.log(res);
      this.tasks = res;
    })


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

