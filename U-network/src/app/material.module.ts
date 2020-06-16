import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snackbar/snackbar.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatNativeDateModule} from '@angular/material';



import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    SnackBarComponent
  ],
  entryComponents: [
    SnackBarComponent
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DATA, useValue: {}
    },
    MatDatepickerModule
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ScrollDispatchModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule,
    MatBadgeModule,

    MatDatepickerModule,
    MatNativeDateModule,  
    MatDividerModule
  ],
  exports:[
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ScrollDispatchModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule,
    MatBadgeModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
