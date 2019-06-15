import { Component, Inject } from '@angular/core';

/** A constant storing the number allow us to access the data
 *  Angular Material stores in the open dialog method.
 *  It can be seen as a service to transfer data between component.
 */
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
            <mat-dialog-content>
              <p>You already got {{ passedData.progress }}%</p>
            </mat-dialog-content>
            <mat-dialog-actions>
              <button mat-button [mat-dialog-close]="true">Yes</button>
              <button mat-button [mat-dialog-close]="false">No</button>
            </mat-dialog-actions>`
})
export class StopTrainingComponent {

  /** Inject an object to the component, passed from the open method
   *  of dialog from current-training.component.ts.
   *  From now on, the passedData can be used in this component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {

  }
}
