/** This class is used to manage (import and export) all the Angular Material Modules.*/

import { NgModule } from '@angular/core';
import {
  MatButtonModule,  // mat-button
  MatIconModule,  // mat-icon
  MatFormFieldModule, // mat-form-field
  MatInputModule,  // matInput
  MatDatepickerModule,  // mat-datepicker
  MatNativeDateModule,  // MatNativeDateModule, date adapter to form the date automatically
  MatCheckboxModule, // mat-checkbox
  MatSidenavModule, // mat-sidenav
  MatToolbarModule, // mat-toolbar
  MatListModule,  // mat-nav-list
  MatTabsModule,  // mat-tab-group
  MatCardModule,  // mat-card
  MatSelectModule,  // mat-select
  MatProgressSpinnerModule, // mat-progress-spinner
  MatDialogModule,  // MatDialog
  MatTableModule, // mat-table
  MatSortModule, // matSort
  MatPaginatorModule, // mat-paginator
  MatSnackBarModule // snack bar
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,  // mat-button
    MatIconModule,  // mat-icon
    MatFormFieldModule, // mat-form-field
    MatInputModule, // matInput
    MatDatepickerModule, // mat-datepicker
    MatNativeDateModule,  // MatNativeDateModule, date adapter to form the date automatically
    MatCheckboxModule, // mat-checkbox
    MatSidenavModule, // mat-sidenav
    MatToolbarModule, // mat-toolbar
    MatListModule, // mat-nav-list
    MatTabsModule,  // mat-tab-group
    MatCardModule,  // mat-card
    MatSelectModule, // mat-select
    MatProgressSpinnerModule, // mat-progress-spinner
    MatDialogModule,  // MatDialog
    MatTableModule, // mat-table
    MatSortModule,  // matSort
    MatPaginatorModule, // mat-paginator
    MatSnackBarModule // snack bar
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
