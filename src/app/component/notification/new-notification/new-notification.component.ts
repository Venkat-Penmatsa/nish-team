import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.css'],
})
export class NewNotificationComponent implements OnInit {
  //model1!: NgbDateStruct;
  //model2!: NgbDateStruct;
  newNotificationForm: FormGroup = new FormGroup({});
  submitted = false;
  selectedList = 'Active';
  statusList = [
    {
      id: '1',
      name: 'Active',
    },
    {
      id: '2',
      name: 'InActive',
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newNotificationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newNotificationForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.newNotificationForm.invalid) {
      return;
    } else {
      console.log('==>', this.newNotificationForm.value);
    }
  }

  onReset(): void {
    this.submitted = false;
    this.newNotificationForm.reset();
  }
}
