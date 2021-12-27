import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  user: User;
  successFlag = false;
  message: string;
  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;

    this.pwdReset.patchValue({
      userName: this.user.empName
    });
  }

 

  resetPwd() {

    console.log('createUser');

    if (this.pwdReset.valid) {

      const formData: any = this.pwdReset.value;
      const updatePassword = {
        userName: this.user.empId,
        oldPwd: formData.oldPwd,
        newPwd: formData.newPwd,
        reEnterNewPwd: formData.reEnterNewPwd,
        role: this.user.role
      }
      this.userService.updateUser(updatePassword).subscribe(res => {
        console.log(res);
        this.successFlag = true;
        this.message = res.empId + " Password updated successfully";
      })
    }
  }


  pwdReset = this.fb.group({
    userName: ['', Validators.required],
    oldPwd: ['', Validators.required],
    newPwd: ['', Validators.required],
    reEnterNewPwd: ['',Validators.required]
  });

}
