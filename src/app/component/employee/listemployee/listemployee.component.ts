import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {EmployeesList} from 'src/app/model/EmployeesList';


@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListemployeeComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['employeeId',
    'contractId',
    'employeeName',
    'clientName',
    'contractStartDate',
    'employeeStatus'];

  empList: EmployeesList[] = [];
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

    this.http.get<EmployeesList[]>('http://localhost:8091/employee/listEmployees', { headers })
      .subscribe((data: EmployeesList[]) => {
        console.log("data ==========> " + data);
        console.log("********empList ***************** " + this.empList);
        data.forEach((obj => {
          let emp: EmployeesList = {
            employeeId: obj.employeeId,
            contractId: obj.contractId,
            employeeName: obj.employeeName,
            clientName: obj.clientName,
            contractStartDate: this.convertDate(obj.contractStartDate),
            //contractStartDate: obj.contractStartDate,
            employeeStatus: obj.employeeStatus
          }
          this.empList.push(emp);
        }
        ))
        this.dataSource.data = this.empList;
      })


  }

  convertDate(toDate : any){
      return toDate[0] + '-' + toDate[1] + '-' + toDate[2];
      //return new Date(toDate[0]-toDate[1]-toDate[2]);
  }

}

