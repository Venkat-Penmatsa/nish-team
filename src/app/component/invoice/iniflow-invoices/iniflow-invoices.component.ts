import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import moment from 'moment';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-iniflow-invoices',
  templateUrl: './iniflow-invoices.component.html',
  styleUrls: ['./iniflow-invoices.component.css'],
})
export class IniflowInvoicesComponent implements OnInit {
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
    'peppolInvoiceId',
    'invoiceId',
    'empName',
    'clientName',
    'contractCompanyName',
    'reference',
    'totalAmount',
    'invoiceDate',
    'dueDate',
    'invoiceType',
    'sentOn',
    'sentBy',
  ];

  invoiceReport: InvoiceReport[] = [];
  invoiceDataSource = new MatTableDataSource<InvoiceReport>(this.invoiceReport);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
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
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  fetchInvoiceReport(event) {
    this.message = false;
    this.invoiceReport = [];
    this.invoiceDataSource = new MatTableDataSource<InvoiceReport>(
      this.invoiceReport
    );
    this.selectedDate = moment(event.value).format('DD-MM-YYYY');
    this.invoiceService
      .fetchIniflowInvoices(this.selectedDate)
      .subscribe((res) => {
        if (res.validationMessage != null) {
          this.message = true;
          this.messageDesc = res.validationMessage;
        }
        res.forEach((e) => {
          this.invoiceReport.push(
            new InvoiceReport(
              e.peppolInvoiceId,
              e.invoiceId,
              e.iniflowCustomerId,
              e.reference,
              e.totalAmount,
              e.invoiceDate,
              e.dueDate,
              e.invoiceType,
              e.sentOn,
              e.sentBy,
              e.empName,
              e.clientName,
              e.contractCompanyName
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
    this.loading$ = this.loader.loading$;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invoiceDataSource.filter = filterValue.trim().toLowerCase();
  }
}

export class InvoiceReport {
  constructor(
    private peppolInvoiceId: string,
    private invoiceId: string,
    private iniflowCustomerId: string,
    private reference: string,
    private totalAmount: number,
    private invoiceDate: string,
    private dueDate: string,
    private invoiceType: string,
    private sentOn: string,
    private sentBy: string,
    private empName: string,
    private clientName: string,
    private contractCompanyName: string
  ) {}
}
