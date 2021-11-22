import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesList } from 'src/app/model/EmployeesList';
import { EmployeeService } from 'src/app/services/employee.service';
import { HistoryDetails } from '../../assets/all-assets/all-assets.component';


@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListemployeeComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['employeeId',
    'empName',
    'contractId',
    'financeStatus',
    'nishContractId',
    'contractStartDate',
    'contractEndDate',
    'contractStatus',
    'clientName',
    'subCont',
    'email',
    'mobile',
    'onBoardingDate',
    'onBoardingStatus',
  'dateOfBirth',
'skills'];

  allEmployeesList: AllEmployeesList[] = [];
  dataSource = new MatTableDataSource<AllEmployeesList>(this.allEmployeesList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    console.log("String...");
    this.employeeService.listAllEmployeeName().subscribe(res => {
      console.log(res);
      res.forEach(e => {
        this.allEmployeesList.push(new AllEmployeesList(e.employeeId,
          e.empName,
          e.contractId,
          e.financeStatus,
          e.nishContractId,
          e.contractStartDate,
          e.contractEndDate,
          e.contractStatus,
          e.clientName,
          e.subCont,
          e.email,
          e.mobile,
          e.onBoardingDate,
          e.onBoardingStatus,
          e.dateOfBirth,
          e.skills));
      })
      this.dataSource = new MatTableDataSource<AllEmployeesList>(this.allEmployeesList);
      this.dataSource.paginator = this.paginator;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  convertDate(toDate: any) {
    return toDate[0] + '-' + toDate[1] + '-' + toDate[2];
    //return new Date(toDate[0]-toDate[1]-toDate[2]);
  }

}


export class AllEmployeesList {
  constructor(
    private employeeId: string,
    private empName: string,
    private contractId: string,
    private financeStatus: string,
    private nishContractId: string,
    private contractStartDate: string,
    private contractEndDate: string,
    private contractStatus: string,
    private clientName: string,
    private subCont: string,
    private email: string,
    private mobile: string,
    private onBoardingDate: string,
    private onBoardingStatus: string,
    private dateOfBirth: string,
    private skills: string
  ) { }
}

