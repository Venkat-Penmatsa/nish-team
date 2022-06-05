import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-asset-history',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.css']
})
export class AssetHistoryComponent implements OnInit,AfterViewInit  {

  constructor(private fb: UntypedFormBuilder, private assetsService: AssetsService) {

  }

  assetHistryList: HistoryDetails[] = [];

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['assetAssignedToEmp', 'empAssignedDate', 'empEndDate', 'status'];
  dataSource = new MatTableDataSource<HistoryDetails>(this.assetHistryList);
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  searchAsset($event: Event) {
    this.assetHistryList = [];
    const searchAssetId = ($event.target as HTMLTextAreaElement).value;
    if (searchAssetId != "") {
      this.assetsService.fetchAssetHistory(searchAssetId).subscribe(res => {
        console.log(res);
        res.forEach(e => {
          this.assetHistryList.push(new HistoryDetails(e.assetAssignedToEmp, e.empAssignedDate, e.empEndDate, e.status));

        })
        this.dataSource = new MatTableDataSource<HistoryDetails>(this.assetHistryList);
      })
    }
  }

}


export class HistoryDetails {
  constructor(
    private assetAssignedToEmp: string,
    private empAssignedDate: Date,
    private empEndDate: Date,
    private status: string
  ) {}
}
