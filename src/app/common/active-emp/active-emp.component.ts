import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { map, startWith } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-active-emp',
  templateUrl: './active-emp.component.html',
  styleUrls: ['./active-emp.component.css']
})
export class ActiveEmpComponent implements OnInit {

  employeeName: any[] = [];
  assetType;
  empList: Observable<any[]>;
  assetAssignedToEmp = new UntypedFormControl();
  @Output() empName = new EventEmitter<any>();
  @Input() filterEmpName;
  constructor(private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.assetAssignedToEmp.setValue(this.filterEmpName);
  }

  ngOnInit(): void {
    this.employeeService.fetchActiveEmployeeName().subscribe(data => {
      this.employeeName = data;
    });
    this.empList = this.assetAssignedToEmp.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private filterEmpList(): Observable<any[]> {

    return of(this._filter(this.filterEmpName));
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.employeeName.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    this.empName.emit(event.option.value);
  }

}
