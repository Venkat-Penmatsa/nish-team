import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DependantService } from '../../dependant/dependant.service';

@Component({
  selector: 'app-delete-dependant',
  templateUrl: './delete-dependant.component.html',
  styleUrls: ['./delete-dependant.component.css']
})
export class DeleteDependantComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDependantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DependantService) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteDependant(this.data.firstName, this.data.lastName);
  }

}
