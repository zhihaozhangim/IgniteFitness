import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  /** Holds all the available exercises. */
  exercises: Exercise[];

  /** Used to unsubscribe exercisesChanged Observable. */
  private exerciseSubscription: Subscription;

  /** Used to unsubscribe loadingStateChanged Observable. */
  private loadingSubscription: Subscription;

  /** Indicates whehter the loading starts or finishes in order to show or hide spinner. */
  isLoading = true;

  /** Inject all services needed. */
  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {

    /** Listen to the event when loading should start or stop. */
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    /** Listen to the changes of exercises from training services. */
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      });
      /** fetch available exercises when there is an exercisesChanged event. */
      this.fetchExercises();
  }

  /** Fetch all available exercises. */
  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  /** Start an exercise which is submitted from the form. */
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  /** Unsubscribe Observables when the component is unloaded. */
  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
