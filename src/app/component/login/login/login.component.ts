import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService:UserService, 
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  errorMessage = "";

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required]
  });

  signIn() {
    if (this.loginForm.valid) {

      this.userService.login(this.loginForm.value).subscribe( (data: any) => {
        console.log(data);

        localStorage.setItem('user', JSON.stringify(data.user));
        
        //this.authService.setUser(data.user);
        this.authService.setToken(data.jwtToken);
        this.router.navigate(['/home']);
      },(error) => {                              //Error callback
        console.error('error caught in component')
        if (error.status == 401) {
          this.errorMessage = "Bad Credentails";
        }
      }
      )
     
    }
  }

}
