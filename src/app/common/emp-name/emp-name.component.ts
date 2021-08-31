import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable,of  } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-emp-name',
  templateUrl: './emp-name.component.html',
  styleUrls: ['./emp-name.component.css']
})
export class EmpNameComponent implements OnInit , OnChanges {

  employeeName: any[] = [];
  assetType;
  empList: Observable<any[]>;
  assetAssignedToEmp = new FormControl();
  @Output() empName = new EventEmitter<any>();
  @Input() filterEmpName;
  constructor(private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {

    // this.empList = this.filterEmpList();
     this.assetAssignedToEmp.setValue(this.filterEmpName);
  }

  ngOnInit(): void {
    this.employeeService.fetchAllEmployeeName().subscribe(data => {
      this.employeeName = data;
    });
    console.log(this.employeeName)
    console.log("filterEmpName .." + this.filterEmpName)
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
