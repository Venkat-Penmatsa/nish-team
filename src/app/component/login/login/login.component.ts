import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required]
  });

  signIn() {
    if (this.loginForm.valid) {

      this.userService.login(this.loginForm.value).subscribe(data => {
        console.log(data);
      })

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

      )*/ 
      //this.router.navigateByUrl('home');
    }
  }

}
