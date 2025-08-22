import { Component, OnInit } from '@angular/core';
import { HotList, Birthday, ExpiringContract } from 'src/app/model/Tasks';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-display-tasks',
  templateUrl: './display-tasks.component.html',
  styleUrls: ['./display-tasks.component.css'],
})
export class DisplayTasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  data!: HotList;
  expiringContracts: ExpiringContract[] = [];
  tableData: any[] = [];
  ngOnInit(): void {
    this.tasksService.fetchTasks().subscribe((res) => {
      this.data = res;
      this.expiringContracts = res.expiringContractsList;
    });
    this.sortData();
  }

  private sortData(): void {
    // Sort birthdays and anniversaries by month and day
    this.data.dateOfBirthList.sort(this.sortByMonthDay);
    this.data.workAnniversaryList.sort(this.sortByMonthDay);

    // Sort expiring contracts by expiry date
    this.data.expiringContractsList.sort((a, b) => {
      const dateA = new Date(a.expiryDate);
      const dateB = new Date(b.expiryDate);
      return dateA.getTime() - dateB.getTime();
    });

    // Sort RP expiry list by date
    this.data.rpExpiryList.sort(this.sortByFullDate);
  }

  // Helper function to sort by month and day
  private sortByMonthDay(a: Birthday, b: Birthday): number {
    const aDate = new Date(2000, a.date[1] - 1, a.date[2]);
    const bDate = new Date(2000, b.date[1] - 1, b.date[2]);
    return aDate.getTime() - bDate.getTime();
  }

  // Helper function to sort by full date
  private sortByFullDate(a: Birthday, b: Birthday): number {
    const aDate = new Date(a.date[0], a.date[1] - 1, a.date[2]);
    const bDate = new Date(b.date[0], b.date[1] - 1, b.date[2]);
    return aDate.getTime() - bDate.getTime();
  }

  // Helper to get month name from number (for display)
  getMonthName(monthIndex: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthIndex - 1];
  }
}
