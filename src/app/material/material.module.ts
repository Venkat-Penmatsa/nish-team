import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../common/dateformat';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';

const MaterialComponents = [MatButtonModule, MatInputModule, MatFormFieldModule,
  MatMenuModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
  MatExpansionModule, MatDatepickerModule, MatNativeDateModule,MatPaginatorModule,
  MatTableModule, MatChipsModule, MatAutocompleteModule, MatCheckboxModule, 
  MatIconModule,MatDialogModule, MatSnackBarModule,MatSelectModule];

@NgModule({

  imports: [MaterialComponents],
  exports: [MaterialComponents],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class MaterialModule { }
