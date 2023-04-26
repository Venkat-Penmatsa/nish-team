import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDependantComponent } from '../dialog-box/delete-dependant/delete-dependant.component';
import { EditDependantComponent } from '../dialog-box/edit-dependant/edit-dependant.component';
import { AddDependantComponent } from '../dialog-box/add-dependant/add-dependant.component';
import { EmployeeDependents } from 'src/app/model/EmployeeDependents';
import { DependantService } from './dependant.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE,MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from 'src/app/constants/DateFormat';

@Component({
  selector: 'app-dependant',
  templateUrl: './dependant.component.html',
  styleUrls: ['./dependant.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DependantComponent implements OnInit, OnChanges {


  displayedColumns = ['id','dependant', 'firstName', 'lastName', 'Gender', 'dob', 'actions'];
  dataSource: any = [];
  index: number;

  @ViewChild(MatTable) table: MatTable<any>;
  employeeDependentList: EmployeeDependents[] = [];
  @Input() savedEmployeeDependant : any = [];
  @Input() empId = "";
  @Output() employeeDependant = new EventEmitter<any>();

  ngOnInit(): void {
    console.log("in edit screen 1");
    if(this.empId != "") {
      console.log("in edit screen 2");
      this.dataSource = this.savedEmployeeDependant;
    }

  }

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: DependantService) {
    //this.dataSource = ELEMENT_DATA;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("in edit screen 1 -- changes");
    this.dataSource = [];
    if(this.empId != "") {
      console.log("in edit screen 2 -- changes");
      this.dataSource = this.savedEmployeeDependant;
    }
  }

  addNew() {
    console.log('Openig dialog ' + this.dataSource)
    const dialogRef = this.dialog.open(AddDependantComponent, {
      data: { issue: EmployeeDependents }
    });
    console.log('Dialogue closed ' + this.dataSource)
    dialogRef.afterClosed().toPromise().then(result => {
      if (result === 1) {
        this.updateDataSource(this.dataService.getDialogData());
      }
    });
  }

  updateDataSource(dependant:any) {
    this.addNewDependant();
    this.dataSource.push(dependant)
    this.table.renderRows();
  }

  addNewDependant() {
    this.employeeDependant.emit(this.dataSource);
  }

  startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string) {
    // this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDependantComponent, {
      data: { id: id, title: title, state: state, url: url, created_at: created_at }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        // this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
      }
    });
  }

  deleteItem(i: number, dependant: string, firstName: string, lastName: string) {
    this.index = i;
    const dialogRef = this.dialog.open(DeleteDependantComponent, {
      data: { dependant: dependant, firstName: firstName, lastName: lastName }
    });

    dialogRef.afterClosed().toPromise().then(result => {
      if (result === 1) {
        const firstName = this.dataService.getDependentToDelete();
        this.dataSource.forEach( (data,index ) => {
          if(data.firstName === firstName){
            this.dataSource.splice(index, 1);
            this.table.renderRows();
            this.addNewDependant();
          }
        })
      }
    });
  }


}

