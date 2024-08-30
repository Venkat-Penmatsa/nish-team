import {
  AfterViewInit,
  Component,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet.service';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { saveAs as importedSaveAs } from 'file-saver';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeavesService } from 'src/app/services/leaves.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import moment from 'moment';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css'],
})
export class InvoiceReportComponent implements OnInit {
  date = new FormControl(moment());
  message = false;
  messageDesc = '';
  loading$: any;
  selectedDate: any;
  // loading$ = new BehaviorSubject<boolean>(false);

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    if (ctrlValue != null) {
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
    }
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    if (ctrlValue != null) {
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
    }
  }

  displayedColumns: string[] = [
    'invoiceId',
    'employeeId',
    'nishContractId',
    'status',
    'generatedDate',
    'submittedDate',
    'billReceivedDate',
    'billRejectedDate',
    'billOnHoldDate',
    'comments',
  ];

  invoiceReport: InvoiceReport[] = [];
  invoiceDataSource = new MatTableDataSource<InvoiceReport>(this.invoiceReport);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private leavesService: LeavesService,
    private _liveAnnouncer: LiveAnnouncer,
    public loader: LoaderService,
    public invoiceService: InvoiceService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.loading$ = this.loader.loading$;
    this.invoiceDataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.invoiceDataSource.paginator = this.paginator;
    this.invoiceDataSource.sort = this.sort;
  }

  announceSortChange(sortState: any) {
    console.log('sorted');
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  downloadInvoiceReport() {
    this.invoiceService
      .downloadInvoiceReport(this.selectedDate)
      .subscribe((res) => {
        console.log(res);
        let blob: any = new Blob([res], { type: 'text/json; charset=utf-8' });
        importedSaveAs(blob, this.selectedDate + '-InvoiceReport.xls');
      });
  }

  fetchInvoiceReport(event) {
    this.message = false;
    this.invoiceReport = [];
    this.invoiceDataSource = new MatTableDataSource<InvoiceReport>(
      this.invoiceReport
    );
    this.selectedDate = moment(event.value).format('DD-MM-YYYY');
    this.invoiceService
      .generateInvoiceReport(this.selectedDate)
      .subscribe((res) => {
        if (res.validationMessage != null) {
          this.message = true;
          this.messageDesc = res.validationMessage;
        }
        res.allInvoiceReport.forEach((e) => {
          this.invoiceReport.push(
            new InvoiceReport(
              e.employeeId,
              e.invoiceId,
              e.nishContractId,
              e.status,
              e.generatedDate,
              e.submittedDate,
              e.billReceivedDate,
              e.billRejectedDate,
              e.billOnHoldDate,
              e.comments
            )
          );
        });
        this.invoiceDataSource = new MatTableDataSource<InvoiceReport>(
          this.invoiceReport
        );
        this.invoiceDataSource.paginator = this.paginator;
        this.invoiceDataSource.sort = this.sort;
      });
  }

  ngOnInit(): void {
    this.message = false;
    console.log('this.loading$...' + this.loading$);
    this.loading$ = this.loader.loading$;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invoiceDataSource.filter = filterValue.trim().toLowerCase();
  }
}

export class InvoiceReport {
  constructor(
    private employeeId: string,
    private invoiceId: string,
    private nishContractId: string,
    private status: string,
    private generatedDate: string,
    private submittedDate: string,
    private billReceivedDate: string,
    private billRejectedDate: string,
    private billOnHoldDate: string,
    private comments: string
  ) {}
}
