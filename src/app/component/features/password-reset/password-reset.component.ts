import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  user: User;

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;

    this.pwdReset.patchValue({
      userName: this.user.empName
    });
  }

  resetPwd(){
    
  }


  pwdReset = this.fb.group({
    userName: ['', Validators.required],
    oldPwd: ['', Validators.required],
    newPwd: ['', Validators.required],
    reEnterNewPwd: ['',Validators.required]
  });

}
