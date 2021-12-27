import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { MessageService } from 'src/app/common/message/message.service';
import { EmployeeDocs, UploadDocs } from 'src/app/constants/documentType';
import { FileUploadService } from 'src/app/services/file-upload.service';



@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {

  public file: File[];
  currentFile: File;
  public fileUploadControl = new FileUploadControl({ listVisible: false });
  selectedOption: string;
  documentsList = UploadDocs;;

  constructor(private uploadService: FileUploadService, private messageService: MessageService) { }

  ngOnInit(): void {
  }


  upload() {
    this.file = this.fileUploadControl.value;
    if (this.file.length > 1) {
      console.log('error');
    } else {
      this.currentFile = this.file[0];
      console.log(' selectedOption ' + this.selectedOption);

      const doc = this.selectedOption;
      let endpoint = "";
      if (doc != undefined) {

        if ("EU" == doc) {
          endpoint = "empData";
        } else if ("CU" == doc) {
          endpoint = "contractData";
        } else if ("LU" == doc) {
          endpoint = "leavesData";
        } else if ("AU" == doc) {
          endpoint = "assetsData";
        }
        this.uploadService.batchUpload(this.currentFile, endpoint).subscribe(
          (event: any) => {
            console.log('response ' + event)
            this.messageService.openSnackBar('Document uploaded successfully', 'Document')
          }
        );
      } else {
        this.messageService.openSnackBar('Please select document type ', 'Document')
      }

    }
  }

}
