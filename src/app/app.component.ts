import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nish-admin';

  constructor(private fb: UntypedFormBuilder) { 

  }
  
  registartionForm = this.fb.group({
    userName: ['Venkat', Validators.required],
    password: [],
    confirmPassword: [],
    address: this.fb.group({
      city: [],
      state: [],
      pincode: []
    }
    )
  });



}



