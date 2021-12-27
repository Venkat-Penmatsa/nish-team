import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssetsService } from 'src/app/services/assets.service';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private assetsService: AssetsService) {

  }

  assetHistryList: HistoryDetail[] = [];

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['assetAssignedToEmp', 'empAssignedDate', 'empEndDate', 'status'];
  dataSource = new MatTableDataSource<HistoryDetail>(this.assetHistryList);


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
          this.assetHistryList.push(new HistoryDetail(e.assetAssignedToEmp, e.empAssignedDate, e.empEndDate, e.status));

        })
        this.dataSource = new MatTableDataSource<HistoryDetail>(this.assetHistryList);
      })
    }
  }

}

export class HistoryDetail {
  constructor(
    private assetAssignedToEmp: string,
    private empAssignedDate: Date,
    private empEndDate: Date,
    private status: string
  ) {}
}