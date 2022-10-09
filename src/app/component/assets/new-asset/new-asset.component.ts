import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AssetsType } from 'src/app/constants/assetsType';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
  styleUrls: ['./new-asset.component.css']
})
export class NewAssetComponent implements OnInit {

  assetsList = AssetsType;
  selectedAsset: string;
  selectedAssetDescription: string;
  employeeName: any[] = [];
  assetType;
  disableBtn = false;
  assetId : any;
  successFlag = false;
  description: string;
  empName:any;
  assetCategorySelected:any;
  constructor(private fb: UntypedFormBuilder, private assetsService: AssetsService) {

  }

  ngOnInit(): void {
   
  }

  onSelectionChange(event : any) {
    let asset = event.target.value;
     this.assetType = asset;
  }

  empNameSelected(emp:any){
    this.empName = emp;
  }

  onSubmit(){

    console.log(this.assetsForm.value);
    this.assetsForm.patchValue({
      assetAssignedToEmp:this.empName
    })
    const assetJson = JSON.stringify(this.assetsForm.value);
    console.log('assetJson ' +assetJson);

    this.assetsService.createAsset(assetJson)
      .subscribe(data => {
        console.log("data ==========> " + data);
        let serviceResponse = data;
        this.assetId = data.assetId;
        this.successFlag = true;

        if(data.responseStatus == "Failure") {
          this.description = data.errorDescription;
        }else{
          this.description = "New Asset created successfully !! Asset id is " + data.assetId;
          this.assetsForm.reset();
        }
      })
  }

  assetsForm = this.fb.group({
    assetType: ['', Validators.required],
    assetAssignedToEmp: [''],
    empAssignedDate: ['', Validators.required],
    comments: ['', Validators.required],
    mobileNumber: [''],
    fuelCard: [''],
    assetCar: this.fb.group({
      model: [''],
      make: [''],
      number: [''],
      color: [''],
      chasisNumber: [''],
      carbonEmission: [],
      status: [''],
      cataloguePrice: [''],
      assetCategory: [''],
      leaseEndDate:['']
    }
    ),
    assetElectronic: this.fb.group({
      electronicModel: [''],
      electronicSerialNumber: [''],
      electronicPrice: ['']
    }
    )
  });


}
