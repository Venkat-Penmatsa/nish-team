import { EmployeeAddress } from "./EmployeeAddress";
import { EmployeeBasicInfo } from "./EmployeeBasicInfo";
import { EmployeeDependents } from "./EmployeeDependents";
import { Skillset } from "./Skillset";

export class Employee {

    empBasicInfo: EmployeeBasicInfo;

    employeeDependents: EmployeeDependents[];

    employeeAddress: EmployeeAddress;

    skillset: Skillset;

    empImage:any;
}