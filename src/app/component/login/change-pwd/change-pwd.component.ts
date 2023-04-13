import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  messageDesc: any;
  errorDesc: any;

  changePwdForm = this.fb.group({
    currentPwd: ['', Validators.required],
    newPwd: ['', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    reEnterNewPed: ['', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
  }, { validators: passwordMatchingValidatior });

  get f() {
    return this.changePwdForm.controls;
  }



  ngOnInit(): void {
  }

  changePwd() {

    let user: any = JSON.parse(localStorage.getItem("user") || '{}');

    this.messageDesc = "";
    this.errorDesc = "";
    const formData: any = this.changePwdForm.value;
      const manageUser = {
        userName: user.empId,
        oldPwd: formData.currentPwd,
        newPwd: formData.newPwd
      }
      this.userService.updateUser(manageUser).subscribe(res => {
        console.log(res);
        this.messageDesc = "Password Updated !!!";
      })

  }

}

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPwd');
  const confirmPassword = control.get('reEnterNewPed');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
}


