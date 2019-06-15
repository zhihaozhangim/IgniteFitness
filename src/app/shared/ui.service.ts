import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

/** This service is used to control global UI functionalites. */
/** Injectable makes services can be injected to this service class. */
@Injectable()
export class UIService {

  /** Used to emit an event when loading starts or finished. */
  loadingStateChanged = new Subject<boolean>();

  /** MatSnackBar can be injected because of @Injectable */
  constructor(private snackbar: MatSnackBar) {
  }

  /** A reuable Snack Bar for pop up error message in sign up and login. */
  showSnackBar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration  // duration that the snack bar shows.
    });
  }
}
