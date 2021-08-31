import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeDependents } from 'src/app/model/EmployeeDependents';


@Injectable({
  providedIn: 'root'
})
export class DependantService {

  public employeeDependent:EmployeeDependents = ({} as any) as EmployeeDependents;
  public employeeDependentList : EmployeeDependents[];

  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';


  // Temporarily stores data from dialogs
  dialogData: any;
  deletFirstName: any;
  dataChange: BehaviorSubject<EmployeeDependents> = new BehaviorSubject<EmployeeDependents>(this.employeeDependent);
  constructor(private httpClient: HttpClient) { }

  get data(): EmployeeDependents {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getDependentToDelete() {
    return this.deletFirstName;
  }

  addDependant(employeeDependents: EmployeeDependents): void {
    this.dialogData = employeeDependents;
    this.dataChange.next(employeeDependents);
  }

  updateIssue(issue: EmployeeDependents): void {
    this.dialogData = issue;
  }

  deleteDependant(firstName: string , lastName: string): void {
    console.log(firstName);
    this.deletFirstName = firstName;

  }
}
