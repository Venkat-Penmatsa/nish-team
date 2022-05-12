
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewcontractService } from 'src/app/services/contracts/newcontract.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AllEmployeesList } from '../../employee/listemployee/listemployee.component';
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
    'comments',
    'contractUpdatedDate',
    'contractUpdatedBy'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading$: any;

  constructor(private newcontractService: NewcontractService,public loader: LoaderService) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {


    console.log(" loader in  contract is ", this.loading$);
    this.loading$ = this.loader.loading$;

    this.newcontractService.listAllContracts().subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
