import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { SharedService } from "../../services/shared.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  errorMessage = "";

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private router: Router, private sharedService: SharedService, private authenticate: AuthenticationService) { }
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  onButtonClick() {
    if (this.loginForm.valid) {
      /*let res = this.authenticate.login(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value);
      res.subscribe(data => {
        console.log("response is " + data);
        localStorage.setItem('userDetails', JSON.stringify(data));
        this.router.navigateByUrl('home');
      }, (error) => {                              //Error callback
        console.error('error caught in component')
        if (error.status == 401) {
          this.errorMessage = "Bad Credentails";
        }
      }

      )
*/
      this.router.navigateByUrl('home');
    }
  }

}
