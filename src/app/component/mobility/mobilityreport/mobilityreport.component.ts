import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { MobilityService } from 'src/app/services/mobility.service';

@Component({
  selector: 'app-mobilityreport',
  templateUrl: './mobilityreport.component.html',
  styleUrls: ['./mobilityreport.component.css']
})
export class MobilityreportComponent implements OnInit {


  selectedDate: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['empName',
    'compHouse',
    'compTravelPass',
    'compOthers',
    'totalAllowanceApplied',
    'comments',
    'appliedBy',
    'appliedDate'];

  applieMobilityMonths: ApplieMobilityMonths[] = [];
  dataSource = new MatTableDataSource<ApplieMobilityMonths>(this.applieMobilityMonths);
  constructor(private mobilityService: MobilityService) { }

  ngOnInit(): void {
  }


  fetchMobilityReport(event) {
    this.applieMobilityMonths = [];
    this.selectedDate = moment(event.value).format("DD-MM-YYYY");
    this.fetchAMonthsMobility(this.selectedDate);
  }

  fetchAMonthsMobility(selectedDate: any): any {

    this.applieMobilityMonths = [];
    this.dataSource = new MatTableDataSource<ApplieMobilityMonths>(this.applieMobilityMonths);
    this.mobilityService.fetchMobilityReport(selectedDate).subscribe(res => {
      console.log(res);
      res.forEach(e => {
        this.applieMobilityMonths.push(new ApplieMobilityMonths(e.empName,
          e.compHouse,
          e.compTravelPass,
          e.compOthers,
          e.totalAllowanceApplied,
          e.comments,
          e.appliedBy,
          e.appliedDate));
      })
      this.dataSource = new MatTableDataSource<ApplieMobilityMonths>(this.applieMobilityMonths);
      this.dataSource.paginator = this.paginator;
    });
    return "Success";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


export class ApplieMobilityMonths {
  constructor(
    private empName: string,
    private compHouse: number,
    private compTravelPass: number,
    private compOthers: number,
    private totalAllowanceApplied: number,
    private comments: string,
    private appliedBy: string,
    private appliedDate: Date
  ) { }
}
