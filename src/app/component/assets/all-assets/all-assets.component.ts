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

  allAssets: AllAssets[] = [];

  ngOnInit(): void {

    this.assetsService.fetchAllAsset().subscribe(res => {
      console.log(res);
      res.forEach(e => {
        this.allAssets.push(new AllAssets(e.assetId,e.assetType,e.assetAssignedToEmp, 
          e.empAssignedDate, e.status,e.mobileNumber,
          e.number,
          e.electronicModel, 
          e.cataloguePrice,
          e.fuelCard,
          e.comments));

      })
      this.dataSource = new MatTableDataSource<AllAssets>(this.allAssets);
      this.dataSource.paginator = this.paginator;
    })
  }

  displayedColumns: string[] = ['assetId','assetType','assetAssignedToEmp', 'empAssignedDate',  'status','mobileNumber','car', 'electronicDevice', 'price','fuelCard','comments'];
  dataSource = new MatTableDataSource<AllAssets>(this.allAssets);


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


export class AllAssets {
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

