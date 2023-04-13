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

    this.messageDesc = "";
    this.errorDesc = "";
    if (this.changePwdForm.value.newPwd !== this.changePwdForm.value.reEnterNewPed) {
      this.errorDesc = "New Password is not matching please re-enter"
    }

  }

}

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPwd');
  const confirmPassword = control.get('reEnterNewPed');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
}


