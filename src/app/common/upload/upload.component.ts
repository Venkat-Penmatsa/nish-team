import { ElementRef, Input, SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { Subject } from 'rxjs';
import { AssetsDocs, CategoryDocs, EmployeeDocs } from 'src/app/constants/documentType';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../message/message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import { saveAs as importedSaveAs } from "file-saver";

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
  currentfile: File;
  categoryType: string;
  categoryDesc: string;
  @Input() fileList: string;
  @Input() category: string;

  //@Input() uniqueId: Subject<string>;


  ngOnChanges(changes: SimpleChanges) {

    this.categoryType = changes.category.currentValue;

    if (this.categoryType == 'employee') {
      this.documentsList == EmployeeDocs;
      this.reqType = 'E';
      this.categoryDesc = "Employee";
    } else if (this.categoryType == 'assets') {
      this.documentsList == AssetsDocs;
      this.reqType = 'A';
      this.categoryDesc = "Asset";
    } else {
      this.documentsList = CategoryDocs;
      this.categoryDesc = this.categoryType;
      this.reqType = this.categoryType;
    }

    this.fetchDocuments(this.categoryType);

  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
    console.log('upload files');
    this.dataSource.paginator = this.paginator;

    if (this.fileList == 'employee') {
      this.documentsList = EmployeeDocs;
      this.reqType = 'E';
      this.categoryDesc = "Employee";
    } else if (this.fileList == 'assets') {
      this.documentsList = AssetsDocs;
      this.reqType = 'A';
      this.categoryDesc = "Asset";
    } else {
      this.documentsList = CategoryDocs;
      this.categoryDesc = this.categoryType;
      this.reqType = this.categoryType;
    }


  }

  constructor(private uploadService: FileUploadService, private messageService: MessageService) {

  }

 fetchDocuments(category: string) :any {
    this.filesList = [];
    this.dataSource = new MatTableDataSource<FilesList>(this.filesList);
    console.log('fetch documents' + this.fileList);
    this.uploadService.fetchAllDocuments(category.replace("/", "==")).subscribe(res => {
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
    });
    return "Success";
  }

  upload() {
    this.uploadFiles().then(this.fetchDocuments(this.categoryType));
  }

  uploadFiles() : any {

    this.file = this.fileUploadControl.value;
    if (this.file.length > 1) {

      const formData: FormData = new FormData();

      formData.append('fileType', this.selectedOption);
      formData.append('category', this.categoryType);
      formData.append('user', this.user.empId);
      formData.append('reqType', this.reqType);

      for (let i = 0; i < this.file.length; i++) {
        formData.append('filesList', this.file[i]);
      }

      this.uploadService.uploadMultiple(formData).subscribe(
        (res) => {
          console.log('response ' + res);
          //this.fetchDocuments(this.categoryType);
        }
      );

      this.messageService.openSnackBar('Document uploaded successfully', 'Document');
    } else {
      this.currentFile = this.file[0];
      this.uploadService.upload(this.currentFile, this.selectedOption, this.categoryType, this.user.empId, this.reqType).subscribe(
        (res) => {
          console.log('response ' + res)
          this.messageService.openSnackBar('Document uploaded successfully', 'Document');
          //this.fetchDocuments(this.categoryType);
        }
      );
    }
    return "success";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: string, path: any) {
    console.log('document to be deleted', id, path);

    this.uploadService.deleteDocument(id, path.replaceAll('/', '@')).subscribe(res => {
      console.log(res);
      this.messageService.openSnackBar('Document deleted successfully', 'Document')
    });
    this.fetchDocuments(this.categoryType);
  }

  onDownload(id: string, path: any) {
    console.log('document to be downloaded', id, path);

    this.uploadService.downloadDocuments(path.replaceAll('/', '@')).subscribe(res => {
      console.log(res);
      window.open(res.url);

      let blob: any = new Blob([res], { type: 'text/json; charset=utf-8' });
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

