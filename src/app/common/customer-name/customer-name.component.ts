import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ClientDetailsService } from 'src/app/services/client-details.service';
@Component({
  selector: 'app-customer-name',
  templateUrl: './customer-name.component.html',
  styleUrls: ['./customer-name.component.css'],
})
export class CustomerNameComponent implements OnInit {
  customerName: any[] = [];
  customerList: Observable<any[]>;
  assetCustName = new FormControl();
  @Output() custName = new EventEmitter<any>();
  @Input() filterCustomerName;
  constructor(private clientDetailsService: ClientDetailsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.assetCustName.setValue(this.filterCustomerName);
  }

  ngOnInit(): void {
    this.clientDetailsService.listAllCustomersName().subscribe((data) => {
      this.customerName = data;
    });
    this.customerList = this.assetCustName.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private filterCustList(): Observable<any[]> {
    return of(this._filter(this.filterCustomerName));
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.customerName.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    this.custName.emit(event.option.value);
  }
}
