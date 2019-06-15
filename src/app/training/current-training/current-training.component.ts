import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  /** Inject services needed. */
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  /** Start a new training or resume a training. */
  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    /** setInterval will return an id */
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        /** The exercise is finished now. */
        this.trainingService.completeExercise();
        /** A JS method, stop the action */
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    /** Immediately stop the timer */
    clearInterval(this.timer);
    /** activate the dialog */
    /** Pass the data to the opened dialog */
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    /** afterClosed() method will return an Observable when it's closed.
     *  We listen to the Observable here.
     *  The result is what's binded to [mat-dialog-close] in mat-dialog-actions
     *  in the stop-training.component.ts.
     */
    dialogRef.afterClosed().subscribe(result => {

      /** Cancel exercise case. We should pass the progress. */
      if (result) {
        this.trainingService.cancelExercie(this.progress);
      } else {
        /** Resume the exercise. */
        this.startOrResumeTimer();
      }
    });
  }
}
