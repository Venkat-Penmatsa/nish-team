import { Component, OnInit } from '@angular/core';
import { LeavesService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css'],
})
export class HolidayListComponent implements OnInit {
  constructor(private leavesService: LeavesService) {}

  holidaysList: any[] = [];

  ngOnInit(): void {
    this.leavesService.fetchCompanyHolidays().subscribe((data) => {
      this.holidaysList = data;
    });
  }
}
