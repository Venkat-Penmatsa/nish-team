import { ElementRef, Input, SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { Subject } from 'rxjs';
import { AssetsDocs, EmployeeDocs } from 'src/app/constants/documentType';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../message/message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  displayedColumns: string[] = ['documentId',
    'category',
    'fileName',
    'documentDesc',
    'documentPath',
    'status',
    'updatedBy',
    'updateDate',
    'action'];

  filesList: FilesList[] = [];
  dataSource = new MatTableDataSource<FilesList>(this.filesList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;

  public file: File[];
  currentFile: File;
  public fileUploadControl = new FileUploadControl({ listVisible: false });
  selectedOption: string;
  documentsList = EmployeeDocs;
  reqType: string;
  user: User;
  category: string;

  @Input() fileList: string;
  @Input() uniqueId: string;

  //@Input() uniqueId: Subject<string>;


  ngOnChanges(changes: SimpleChanges) {

    this.category = changes.uniqueId.currentValue;
    this.fetchDocuments(this.category);

    if (changes.fileList.currentValue = 'employee') {
      this.documentsList = EmployeeDocs;
      this.reqType = 'E';
    } else if (changes.fileList.currentValue = 'assets') {
      this.documentsList = AssetsDocs;
      this.reqType = 'A';
    }

  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
    console.log('upload files');
    this.dataSource.paginator = this.paginator;



  }

  constructor(private uploadService: FileUploadService, private messageService: MessageService) {

  }

  fetchDocuments(category: string) {
    this.filesList = [];
    this.uploadService.fetchAllDocuments(category).subscribe(res => {
      console.log(res);
      res.forEach(e => {
        this.filesList.push(new FilesList(e.documentId,
          e.category,
          e.filename,
          e.documentDescription,
          e.documentPath,
          e.documentStatus,
          e.uploadedBy,
          e.uploadedDate));
      })
      this.dataSource = new MatTableDataSource<FilesList>(this.filesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.dataSource.data;
    });

  }

  upload() {
    console.log('upload files');

    this.file = this.fileUploadControl.value;
    if (this.file.length > 1) {
      console.log('has more than one file, cannt be uploaded');
    } else {
      this.currentFile = this.file[0];
      this.uploadService.upload(this.currentFile, this.selectedOption, this.category, this.user.empId, this.reqType).subscribe(
        (event: any) => {
          console.log('response ' + event)
          this.messageService.openSnackBar('Document uploaded successfully', 'Document')
        }
      );
    }
    this.fetchDocuments(this.category);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: string, path: any) {
    console.log('document to be deleted', id, path);

    this.uploadService.deleteDocument(id, path.replaceAll('/','@')).subscribe(res => {
      console.log(res);
      this.messageService.openSnackBar('Document deleted successfully', 'Document')
    });
    this.fetchDocuments(this.category);
  }

  onDownload(id: string, path: any) {
    console.log('document to be downloaded', id, path);

    this.uploadService.downloadDocuments(path.replaceAll('/','@')).subscribe(res => {
      console.log(res);
      window.open(res.url);

      let blob:any = new Blob([res], { type: 'text/json; charset=utf-8' });
      importedSaveAs(blob, id);

    }), (error: any) => console.log('Error downloading the file')
  }
}


export class FilesList {
  constructor(
    private documentId: number,
    private category: string,
    private fileName: string,
    private documentDesc: string,
    private documentPath: string,
    private status: string,
    private updatedBy: string,
    private updateDate: Date
  ) { }
}

