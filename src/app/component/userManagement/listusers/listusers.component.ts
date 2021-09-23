import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private userService: UserService) {

  }

  userDetailList: UserDetail[] = [];

  ngOnInit(): void {

    this.userService.fetchUsersList().subscribe(res => {
      console.log(res);
      res.forEach(e => {
        this.userDetailList.push(new UserDetail(e.empId, e.userActive, e.role));

      })
      this.dataSource = new MatTableDataSource<UserDetail>(this.userDetailList);
    })

  }

  displayedColumns: string[] = ['userName', 'status', 'role'];
  dataSource = new MatTableDataSource<UserDetail>(this.userDetailList);

}

export class UserDetail {
  constructor(
    private userName: string,
    private status: Date,
    private role: string
  ) {}
}
