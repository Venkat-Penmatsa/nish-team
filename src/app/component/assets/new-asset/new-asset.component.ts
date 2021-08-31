import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetsType } from 'src/app/constants/assetsType';
import { map, startWith } from 'rxjs/operators';
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
  empName:any;
  constructor(private fb: FormBuilder, private assetsService: AssetsService) {

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
    const headers = { 'Content-type': 'application/json' };

    this.assetsService.createAsset(assetJson)
      .subscribe(data => {
        console.log("data ==========> " + data);
        let serviceResponse = data;
        this.assetId = data.assetId;
        this.successFlag = true;
      })
  }

  assetsForm = this.fb.group({
    assetType: ['', Validators.required],
    assetAssignedToEmp: ['', Validators.required],
    empAssignedDate: ['', Validators.required],
    comments: [''],
    mobileNumber: ['', Validators.required],
    fuelCard: ['', Validators.required],
    assetCar: this.fb.group({
      model: ['', Validators.required],
      make: ['', Validators.required],
      number: ['', Validators.required],
      color: ['', Validators.required],
      chasisNumber: ['', Validators.required],
      carbonEmission: [],
      status: ['', Validators.required],
      cataloguePrice: ['', Validators.required],
      assetCategory: ['', Validators.required]
    }
    ),
    assetElectronic: this.fb.group({
      electronicModel: ['', Validators.required],
      electronicSerialNumber: ['', Validators.required],
      electronicPrice: ['', Validators.required]
    }
    )
  });


}
