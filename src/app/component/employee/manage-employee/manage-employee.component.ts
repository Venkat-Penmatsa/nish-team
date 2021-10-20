import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { MessageService } from 'src/app/common/message/message.service';
import { EmployeeDocs } from 'src/app/constants/documentType';
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
  documentsList = EmployeeDocs;

  constructor(private uploadService: FileUploadService, private messageService: MessageService) { }

  ngOnInit(): void {
  }


  upload() {
    this.file = this.fileUploadControl.value;
    if (this.file.length > 1) {
      console.log('error');
    } else {
      this.currentFile = this.file[0];
      this.uploadService.batchUpload(this.currentFile,'batchUpload/empData').subscribe(
        (event: any) => {
          console.log('response ' + event)
          this.messageService.openSnackBar('Document uploaded successfully','Document')
        }
      );
    }
  }


}
