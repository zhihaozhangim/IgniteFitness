import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Defines the header of the table.
   *  Also used to define the columns to display.
   *  Have to match *matColumnDef in the table.
   */
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  /** data used to display in the table.
   *  The data type defined in MatTableDataSource already assume
   *  Exercise is passed as an Exercise array, Exercise[]. Just pass an array to it.
   */
  dataSource = new MatTableDataSource<Exercise>();

  /** Used to unsubscribe finishedExercisesChanged Observable. */
  private exChangedSubscription: Subscription;

  /** View child can get access to the element in the html file.
   *  MatSort: we add it in the mat-table. The underlying logic will be injected
   *  to sort, whose type is MatSort.
   *  We can fetch MatSort only when the template is done rendering.
   */
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; // get access to the paginator.
  constructor(private trainingService: TrainingService) { }

  /** At this time, the view is not done rendering yet. */
  ngOnInit() {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  /** Execute once the view is done rendering and initializing. */
  ngAfterViewInit() {

    /** Sort the data */
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Filter the data based on user's input.
   *  @param filterValue - user's input.
   */
  doFilter(filterValue: string) {
    /** mat-table will concatenate all rows into one big string to filter. */
    /** Ref: https://material.angular.io/components/table/overview#filtering */
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Unsubscribe all subscriptions when the component is unloaded. */
  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
}
