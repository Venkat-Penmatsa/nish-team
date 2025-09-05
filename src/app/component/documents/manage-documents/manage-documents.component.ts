import { DocumentsService } from 'src/app/services/documents.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap, switchMap } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-manage-documents',
  templateUrl: './manage-documents.component.html',
  styleUrls: ['./manage-documents.component.css'],
})
export class ManageDocumentsComponent implements OnInit, OnDestroy {
  fileList: string;
  category: string;
  newSubCategory: string;
  newCategory: string;

  employeeName: any[] = [];
  empList: Observable<any[]>;
  assetAssignedToEmp = new UntypedFormControl();

  private refreshSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(private documentService: DocumentsService) {}

  ngOnInit(): void {
    // Set up a stream that fetches documents whenever the refresh subject emits or on initial load
    this.refreshSubject
      .pipe(
        startWith(null), // Emit a value on initial load to fetch data immediately
        switchMap(() =>
          this.documentService.fetchDocsCategory().pipe(
            tap((data) => {
              this.employeeName = data;
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    // Set up the autocomplete filter
    this.empList = this.assetAssignedToEmp.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnDestroy(): void {
    // Clean up all subscriptions to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
    this.refreshSubject.complete();
  }

  createDocsCategory(category: string) {
    if (category && category.trim() !== '') {
      this.documentService.createDocsCategory(category).subscribe((res) => {
        // Success message is logged here.
        console.log('Category created successfully:', res);
        // We now trigger the refresh stream instead of making a new subscription
        this.refreshSubject.next();
      });
    }
  }

  createSubDocsCategory(newSubCategory: string) {
    if (this.category && newSubCategory && newSubCategory.trim() !== '') {
      this.documentService
        .createDocsCategory(`${this.category}==${newSubCategory}`)
        .subscribe((res) => {
          // Success message is logged here.
          console.log('Sub-category created successfully:', res);
          // Trigger the refresh stream
          this.refreshSubject.next();
        });
    }
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.employeeName.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    this.category = event.option.value;
    this.fileList = this.category;
  }
}
