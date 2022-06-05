
import { DocumentsService } from 'src/app/services/documents.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-manage-documents',
  templateUrl: './manage-documents.component.html',
  styleUrls: ['./manage-documents.component.css']
})
export class ManageDocumentsComponent implements OnInit {

  selectUpdateCategory: string;
  fileList: string;
  category: string;
  newSubCategory: string;
  newCategory: string;
  categoryList: any[] = [];
  allDocumentsCatelgory: Observable<any[]>;
  categoryAssign = new UntypedFormControl();
  employeeName: any[] = [];
  assetType;
  empList: Observable<any[]>;
  assetAssignedToEmp = new UntypedFormControl();

  constructor(private documentService: DocumentsService) {

  }

  ngOnInit(): void {
    this.fetchDocsCategory();
    this.fileList = this.category;
  }

  createDocsCategory(category: string) {

    if (category !== "undefined" && category !== "") {
      this.documentService.createDocsCategory(category).subscribe(res => {
        console.log(res);
        this.fetchDocsCategory();
      });
    }
  }

  createSubDocsCategory(newSubCategory: string) {

    if (this.category !== "undefined" && this.category !== "" && newSubCategory !== "undefined" && newSubCategory !== "") {
      this.documentService.createDocsCategory(this.category+'=='+newSubCategory).subscribe(res => {
        console.log(res);
        this.fetchDocsCategory();
      });
    }
  }


  fetchDocsCategory() {

    console.log("docs");

    this.documentService.fetchDocsCategory().subscribe(data => {
      this.employeeName = data;
    });
    this.empList = this.assetAssignedToEmp.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.employeeName.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    this.category = event.option.value;
    this.fileList = this.category;
  }


}
