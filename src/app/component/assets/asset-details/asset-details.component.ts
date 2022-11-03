import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {

  constructor(private assetsService : AssetsService) { }

  holidaysList : any[] = [];

 ngOnInit(): void {
  let user :any = JSON.parse(localStorage.getItem("user") || '{}');
   this.assetsService.fetchEmployeeAssets(user.empId)
   .subscribe(data => {
       console.log("holiday date ... " + data);
       this.holidaysList = data
   });

}
}