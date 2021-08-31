import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leavebalence',
  templateUrl: './leavebalence.component.html',
  styleUrls: ['./leavebalence.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeavebalenceComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['employeeId',
    'sickLeaves',
    'recuparationLeaves',
    'forwardedLeaves'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {


    console.log("String...")

    const headers = { 'Content-type': 'application/json' };

    this.http.get('http://localhost:8091/leaves/leavesBalence', { headers })
      .subscribe((data: any) => {
        console.log("data ==========> " + data);
        this.dataSource.data = data;
      })


  }

}
