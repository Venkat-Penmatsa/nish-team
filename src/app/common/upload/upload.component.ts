import { ElementRef, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { AssetsDocs, EmployeeDocs } from 'src/app/constants/documentType';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  public file: File[];
  currentFile: File;
  public fileUploadControl = new FileUploadControl({ listVisible: false });
  selectedOption: string;
  documentsList = EmployeeDocs;

  @Input() fileList: string;
  @Input() uniqueId: string;

  if(fileList = 'employee'){
    this.documentsList = EmployeeDocs;
  } elseif(fileList = 'assets'){
    this.documentsList = AssetsDocs;
  }

 
  ngOnInit(): void {
    console.log('upload files');
   
  
  }

  constructor(private uploadService: FileUploadService, private messageService: MessageService) { }

  upload() {
    this.file = this.fileUploadControl.value;
    if (this.file.length > 1) {
      console.log('error');
    } else {
      this.currentFile = this.file[0];
      this.uploadService.upload(this.currentFile, this.selectedOption+';'+this.uniqueId).subscribe(
        (event: any) => {
          console.log('response ' + event)
          this.messageService.openSnackBar('Document uploaded successfully','Document')
        }
      );
    }
  }



}

