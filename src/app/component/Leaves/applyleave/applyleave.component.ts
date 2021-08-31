import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyleaveComponent implements OnInit {

  displayedColumns: string[] = ['employeeId',
    'sickLeaves',
    'recuparationLeaves',
    'forwardedLeaves'];

  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient, private fb: FormBuilder) {

  }


  onChangeEvent(event: any) {
    console.log("emp id : " + event.target.value);
    const headers = { 'Content-type': 'application/json' };
    this.http.get('http://localhost:8091/leaves//empLeavesBalence/' + event.target.value, { headers })
      .subscribe((data: any) => {
        console.log("data ==========> " + data);
        this.dataSource.data = data;
        console.log("pending leaves " + this.dataSource.data.values)
      })
  }

  ngOnInit(): void {

  }


  leaveForm = this.fb.group({

    leaveType: ['', Validators.required],
    leaveStartDate: [''],
    leaveEndDate: [''],
    comments: ['']
  });

  onSubmit() {
    
  }

}
