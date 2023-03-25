import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  empName: any;
  filterEmpName: string;
  successFlag = false;
  message: string;
  constructor(private fb: UntypedFormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.userForm.patchValue({
      role: "Employee",
    });
  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  userForm = this.fb.group({
    password: ['', Validators.required],
    active: ['', Validators.required],
    role: ['', Validators.required]
  });

  createUser() {

    console.log('createUser');

    if (this.userForm.valid) {

      const formData: any = this.userForm.value;
      const manageUser = {
        empId: this.empName,
        role: formData.role,
        password: formData.password,
        userActive: formData.active
      }
      this.userService.createNewUser(manageUser).subscribe(res => {
        console.log(res);
        this.successFlag = true;
        this.message = res.empId + " Adminstrated successfully";
      })
    }
  }


  generateRandomPD() {

    this.userService.generateRandomPD().subscribe((res: any) => {
      this.userForm.patchValue({
        password: res.randomPw,
      });
    })
  }

}
