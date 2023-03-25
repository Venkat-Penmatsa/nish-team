import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssetsService } from 'src/app/services/assets.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  successMessage: any;
  errorDescription: any;


  constructor(private fb: UntypedFormBuilder, private userService: UserService) {

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  userDetailList: UserDetail[] = [];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(user: any) {

    this.errorDescription = "";
    this.successMessage = "";

    this.userService.deleteUser(user.userName).subscribe((res: any) => {
      let deleteUserRes: any = res;

      this.userDetailList = [];

      this.errorDescription = res.successMessage;
      this.successMessage = res.errorDescription;

      this.getUserList();

    });

  }

  ngOnInit(): void {

    this.getUserList();

  }

  getUserList() {

    this.userDetailList = [];
    this.userService.fetchUsersList().subscribe(res => {
      console.log(res);
      res.forEach(e => {
        this.userDetailList.push(new UserDetail(e.empId, e.userActive, e.role));
      })
      this.dataSource = new MatTableDataSource<UserDetail>(this.userDetailList);
      this.dataSource.paginator = this.paginator;
    })
  }

  displayedColumns: string[] = ['userName', 'status', 'role', 'actions'];
  dataSource = new MatTableDataSource<UserDetail>(this.userDetailList);

}

export class UserDetail {
  constructor(
    private userName: string,
    private status: Date,
    private role: string
  ) { }
}
