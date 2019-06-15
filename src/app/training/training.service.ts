import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

/** Provide Firebase related funtionalties. */
import { AngularFirestore } from 'angularfire2/firestore';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

/** TrainingService is used to manage the training. */
@Injectable()
export class TrainingService {

  /** Listen to the event whether the selected exercise has been changed. */
  exerciseChanged = new Subject<Exercise>();

  /** Listen to the event when availableExercises are fetched from db.  */
  exercisesChanged = new Subject<Exercise[]>();

  /** Listen to the event when there is a new compeleted or cancelled exercise. */
  finishedExercisesChanged = new Subject<Exercise[]>();

  /** All available exercises. */
  private availableExercises: Exercise[] = [];

  /** The exercise that user select */
  private runningExercise: Exercise;

  /** Used to unsubscribe subscriptions related to Firebase. */
  private fbSubs: Subscription[] = [];

  /** Inject all services needed. */
  constructor(private db: AngularFirestore, private uiService: UIService) {}

  /** Fetch available exercises from Firebase db */
  fetchAvailableExercises() {
    /** Indicate the loading starts */
    this.uiService.loadingStateChanged.next(true);
    /** Push the subscription to the subscription array for unsubscribe when
     *  the user log out.
     */
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()  // compared with valueChange, snapshotChanges contains meta data like ID.
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      }))
      .subscribe((exercises: Exercise[]) => {
        /** Indicate the loading finishes. */
        this.uiService.loadingStateChanged.next(false);
        /** set availableExercises to all available exercises from db.  */
        this.availableExercises = exercises;
        /** emit the event with all available exercises to new-training component. */
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        /** Indicate the loading finishes. */
        this.uiService.loadingStateChanged.next(false);

        /** Error handling. */
        this.uiService.showSnackBar('Fetching exercises failed, please try again later', null, 3000);

        /** Indicate no exercises have been found.
         *  In new-training component, this event means we can fetch the data again.
         */
        this.exercisesChanged.next(null);
      }));
  }

  /** Start a selected Exercise
   *  @param selectedId - the id of the selected exercise.
   */
  startExercise(selectedId: string) {
    /** Add/update a field to the document when the exercise when selected.  */
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    /** Emit an event and carrys the current runningExercise as payload to training.component.ts.  */
    this.exerciseChanged.next({...this.runningExercise});
  }

  /** Complete the Exercise */
  completeExercise() {

    /** Add the finished exercise to db. */
    this.addDataToDatabase({
       ...this.runningExercise,
       date: new Date(),
       state: 'completed'
    });

    /** We get no running Exercise now */
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  /** Cancel the exercise
   *  @param progress - the progress has been made when cancelling.
  */
  cancelExercie(progress: number) {

    /** Add the canceled exercise to db. */
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
   });

   /** We get no running Exercise now */
   this.runningExercise = null;
   this.exerciseChanged.next(null);
  }

  /** Get the current exercise. */
  getRunningExercise() {
    return { ...this.runningExercise };
  }

  /** fetch all the finished or cancelled exercises from db. */
  fetchCompletedOrCancelledExercises() {
    /** Push the subscription to the subscription array for unsubscribe when
     *  the user log out.
     */
    this.fbSubs.push(this.db.
      collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        /** Sent an event to past-training compoent with finished exercises. */
        this.finishedExercisesChanged.next(exercises);
    }));
  }

  /** Cancel all Firebase related subscriptions. */
  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  /** Add the completed exercise to db to persist the data. */
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
