import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AssetsType } from 'src/app/constants/assetsType';
import { map, startWith } from 'rxjs/operators';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-update-assets',
  templateUrl: './update-assets.component.html',
  styleUrls: ['./update-assets.component.css']
})
export class UpdateAssetsComponent implements OnInit {


  assetsList = AssetsType;
  selectUpdateCategory: string;
  selectedAsset: string;
  selectedAssetDescription: string;
  employeeName: any[] = [];
  assetType;
  disableBtn = false;
  assetId: any;
  successFlag = false;
  empName: any;
  filterEmpName: string;
  description: string;
  fileList = 'assets';
  searchAssetId: string;
  assetCategory:any;

  constructor(private fb: UntypedFormBuilder, private assetsService: AssetsService) {

  }

  ngOnInit(): void {

  }

  updateCarAsset() {

    const formData: any = this.updateAssetForm.value;
    this.successFlag = false;
    const carAsset = {
      assetId: formData.assetId,
      comments: formData.assetCar.assetComments,
      model: formData.assetCar.model,
      make: formData.assetCar.make,
      number: formData.assetCar.number,
      color: formData.assetCar.color,
      chasisNumber: formData.assetCar.chasisNumber,
      carbonEmission: formData.assetCar.carbonEmission,
      carStatus: formData.assetCar.carStatus,
      cataloguePrice: formData.assetCar.cataloguePrice,
      assetCategory: formData.assetCar.assetCategory,
      leaseEndDate:formData.assetCar.leaseEndDate
    }
    this.assetsService.updateCarAsset(carAsset).subscribe(res => {
      console.log(res);
      this.successFlag = true;
    })
  }

  updateElectronicAsset() {

    const formData: any = this.updateAssetForm.value;
    this.successFlag = false;
    const electronucAsset = {
      assetId: formData.assetId,
      electronicModel: formData.assetElectronic.electronicModel,
      electronicSerialNumber: formData.assetElectronic.electronicSerialNumber,
      electronicPrice: formData.assetElectronic.electronicPrice,
      comments: formData.assetElectronic.assetComments
    }
    this.assetsService.updateElectronicAsset(electronucAsset).subscribe(res => {
      console.log(res);
      this.successFlag = true;

      if (res.responseStatus == "Failure") {
        this.description = res.errorDescription;
      } else {
        this.description = res.assetId;
      }

    })
  }

  assignAsset() {
    this.successFlag = false;
    const formData: any = this.updateAssetForm.value;
    this.description = "";
    const assignAsset = {
      assetId: formData.assetId,
      empAssignedDate: formData.empAssignedDate,
      currentEmpEndDate: formData.currentEmpEndDate,
      newEmpAssignedDate: formData.newEmpAssignedDate,
      comments: formData.comments,
      assetAssignedToEmp: this.empName,
      status: formData.status,
      empAssetId: formData.empAssetId
    }

    if (assignAsset.currentEmpEndDate == "" || assignAsset.newEmpAssignedDate == "" || assignAsset.assetAssignedToEmp == undefined) {
      this.successFlag = true;
      this.description = "Please select all Mandatory fields";
    } else if (assignAsset.currentEmpEndDate < assignAsset.assetAssignedToEmp) {
      this.successFlag = true;
      this.description = "Current Emp Asset End Date should not be less than Start date";
    } else if (assignAsset.newEmpAssignedDate < assignAsset.currentEmpEndDate) {
      this.successFlag = true;
      this.description = "New Emp Asset Start Date should not be less than Current Employee End date";
    }else {
      this.assetsService.assignAsset(assignAsset).subscribe(res => {
        console.log(res);
        this.successFlag = true;
        if (res.responseStatus == "Failure") {
          this.description = res.errorDescription;
        } else {
          this.description = "Asset " + res.assetId + " Updated Successfully";
        }
      })
    }
  }

  searchAsset($event: Event) {
    this.successFlag = false;
    this.searchAssetId = ($event.target as HTMLTextAreaElement).value;
    if (this.searchAssetId != "") {
      // this.updateAssetForm.reset();
      this.assetsService.fetchAsset(this.searchAssetId).subscribe(res => {
        console.log("data ==========> " + res);
        this.assetType = res.assetType;
        //this.filterEmpName = res.assetAssignedToEmp
        this.updateAssetForm.patchValue({
          assetId: res.assetId,
          empAssignedDate: new Date(res.empAssignedDate),
          comments: res.empCommnets,
          mobileNumber: res.mobileNumber,
          fuelCard: res.fuelCard,
          empAssetId: res.empAssetId,
          currentEmp: res.assetAssignedToEmp,
          assetCar: {
            model: res.model,
            make: res.make,
            number: res.number,
            color: res.color,
            chasisNumber: res.chasisNumber,
            carbonEmission: res.carbonEmission,
            carStatus: res.carStatus,
            cataloguePrice: res.cataloguePrice,
            assetCategory: res.assetCategory,
            leaseEndDate:res.leaseEndDate
          },
          assetElectronic: {
            electronicModel: res.electronicModel,
            electronicSerialNumber: res.electronicSerialNumber,
            electronicPrice: res.electronicPrice

          }
        });
        this.assetCategory = res.assetCategory;
        console.log("this.updateAssetForm ==========> " + this.updateAssetForm);
      })
    }
  }

  onSelectionChange(event: any) {
    let asset = event.target.value;
    this.assetType = asset;
  }

  empNameSelected(emp: any) {
    this.empName = emp;
  }

  onSubmit() {
    this.successFlag = false;
    console.log(this.updateAssetForm.value);
    this.updateAssetForm.patchValue({
      assetAssignedToEmp: this.empName
    })
    const assetJson = JSON.stringify(this.updateAssetForm.value);
    console.log('assetJson ' + assetJson);
    const headers = { 'Content-type': 'application/json' };

    this.assetsService.createAsset(assetJson)
      .subscribe(data => {
        console.log("data ==========> " + data);
        this.assetId = data.assetId;
        this.successFlag = true;
        if (data.responseStatus == "Failure") {
          this.description = data.errorDescription;
        } else {
          this.description = "Asset " + this.assetId + " Updated Successfully";
        }
      })
  }

  updateAssetForm = this.fb.group({
    assetId: ['', Validators.required],
    updateCategory: ['', Validators.required],
    empAssignedDate: ['', Validators.required],
    currentEmpEndDate: ['', Validators.required],
    newEmpAssignedDate: ['', Validators.required],
    currentEmp: [''],
    empAssetId: ['', Validators.required],
    status: ['', Validators.required],
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
      carStatus: ['', Validators.required],
      cataloguePrice: ['', Validators.required],
      assetCategory: ['', Validators.required],
      leaseEndDate:[''],
      assetComments: []
    }
    ),
    assetElectronic: this.fb.group({
      electronicModel: ['', Validators.required],
      electronicSerialNumber: ['', Validators.required],
      electronicPrice: ['', Validators.required],
      assetComments: []
    }
    )
  });

}
