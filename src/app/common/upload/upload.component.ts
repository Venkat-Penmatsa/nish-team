import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { EmployeeDocs } from 'src/app/constants/documentType';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  ngOnInit(): void {
    console.log('upload files');
  }

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  public file: File[];
  currentFile: File;
  public fileUploadControl = new FileUploadControl({ listVisible: false });
  selectedOption: string;
  documentsList = EmployeeDocs;

  constructor(private uploadService: FileUploadService, private messageService: MessageService) { }

  upload() {
    this.file = this.fileUploadControl.value;
    if (this.file.length > 1) {
      console.log('error');
    } else {
      this.currentFile = this.file[0];
      this.uploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          console.log('response ' + event)
          this.messageService.openSnackBar('Document uploaded successfully','Document')
        }
      );
    }
  }



}

