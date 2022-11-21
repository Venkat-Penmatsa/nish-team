import { Component, OnInit } from '@angular/core';
import { LeavesService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-leaves-history',
  templateUrl: './leaves-history.component.html',
  styleUrls: ['./leaves-history.component.css']
})
export class LeavesHistoryComponent implements OnInit {

  constructor(private leavesService: LeavesService) { }

  leaves: any[] = [];
  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem("user") || '{}');
    this.leavesService.fetchEmpLeavesHist(user.empId)
      .subscribe(data => {
        this.leaves = data
        console.log("leaves history........." + this.leaves);
      });

  }
}
