import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientDetailsService } from 'src/app/services/client-details.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-list-all-clients',
  templateUrl: './list-all-clients.component.html',
  styleUrls: ['./list-all-clients.component.css'],
})
export class ListAllClientsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'clientId',
    'clientName',
    'address1',
    'address2',
    'postcode',
    'country',
    'tva',
    'invoicePaymentDays',
    'clientEmail',
    'clientOnBoardedDate',
    'clientPhone',
    'comments',
    'updatedBy',
  ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading$: any;

  constructor(
    private clientDetailsService: ClientDetailsService,
    public loader: LoaderService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log(' loader in  contract is ', this.loading$);
    this.loading$ = this.loader.loading$;

    this.clientDetailsService.listAllCustomers().subscribe((res) => {
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
