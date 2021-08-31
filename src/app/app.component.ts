import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nish-admin';

  constructor(private fb: FormBuilder) { 

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



  // registartionForm = new FormGroup({
  //   userName: new FormControl('Venkat'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address : new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     pincode: new FormControl(''),
  //   })
  // });

  loadAPIData() {
    this.registartionForm.patchValue({
      userName: 'venkat',
      password: 'test'
    });
  }

}



