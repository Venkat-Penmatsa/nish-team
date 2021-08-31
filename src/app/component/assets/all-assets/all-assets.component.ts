import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssetsService } from 'src/app/services/assets.service';


@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.css']
})
export class AllAssetsComponent implements OnInit,AfterViewInit  {

  constructor(private fb: FormBuilder, private assetsService: AssetsService) {

  }

  assetHistryList: HistoryDetails[] = [];

  ngOnInit(): void {

    this.assetsService.fetchAllAsset().subscribe(res => {
      console.log(res);
      res.forEach(e => {
        this.assetHistryList.push(new HistoryDetails(e.assetId,e.assetType,e.assetAssignedToEmp, 
          e.empAssignedDate, e.status,e.mobileNumber,
          e.make+'-'+e.model+'-'+e.number,
          e.electronicModel, 
          e.electronicPrice,
          e.fuelCard,
          e.comments));

      })
      this.dataSource = new MatTableDataSource<HistoryDetails>(this.assetHistryList);
    })
  }

  displayedColumns: string[] = ['assetId','assetType','assetAssignedToEmp', 'empAssignedDate',  'status','mobileNumber','car', 'electronicDevice', 'price','fuelCard','comments'];
  dataSource = new MatTableDataSource<HistoryDetails>(this.assetHistryList);


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}


export class HistoryDetails {
  constructor(
    private assetId: string,
    private assetType: string,
    private assetAssignedToEmp: string,
    private empAssignedDate: Date,
    private status: string,
    private mobileNumber: string,
    private car: string,
    private electronicDevice: string,
    private price: string,
    private fuelCard: string,
    private comments: string
  ) {}
}

