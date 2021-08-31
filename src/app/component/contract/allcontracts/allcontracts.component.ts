
import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Contract } from '../contract';

@Component({
  selector: 'app-allcontracts',
  templateUrl: './allcontracts.component.html',
  styleUrls: ['./allcontracts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllcontractsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['employeeId',
    'contractId',
    'nishContractId',
    'contractStatus',
    'clientName',
    'billingRate',
    'contractStartDate',
    'contractEndDate',
    'comments'];

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

    this.http.get('http://localhost:8091/contract/listContracts', { headers })
      .subscribe((data: any) => {
        console.log("data ==========> " + data);
        this.dataSource.data = data;
      })


  }

}
