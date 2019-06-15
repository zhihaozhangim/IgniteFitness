import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

/** AuthService is for Authentication */
/** In order to inject a service into another service,
 *  @Injectable() is needed.
  */
@Injectable()
export class AuthService {
  /** Here, the payload of the Subject is boolean.
   *  Indicating whether the user has been authenticated or not.
   */
  authChange = new Subject<boolean>();

  /** Indicate whether the user has been authenticated. */
  private isAuthenticated = false;

  /** Inject all services needed in this service. */
  constructor(
    private router: Router,
    private afauth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    ) {}

  /** Listen to the change of auth status of the user.
   *  Used for log in and log out status change.
   */
  initAuthListener() {
    /** Will emit an event whenever authentication status changes. */
    this.afauth.authState.subscribe(user => {
      if (user) { // authenticated.
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {  // not authenticated. e.g. click log out.
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  /** Sign up a user */
  registerUser(authData: AuthData) {

    /** Indicate loading starts in order to hide the spinner. */
    this.uiService.loadingStateChanged.next(true);

    /** Sign up with Firebase Authentication */
    this.afauth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      /** Indicate loading finishes in order to hide the spinner. */
      this.uiService.loadingStateChanged.next(false);
    })
    .catch(error => {
      /** Indicate loading finishes in order to hide the spinner. */
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  /** Log in an user. */
  /** Status change of authentication status is handled by initAuthListener. */
  login(authData: AuthData) {

    /** Indicate loading starts in order to show the spinner. */
    this.uiService.loadingStateChanged.next(true);

    /** Log in with Firebase Authentication */
    this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      /** Indicate loading finishes in order to hide the spinner. */
      this.uiService.loadingStateChanged.next(false);
    })
    .catch(error => {
      /** Indicate loading finishes in order to hide the spinner. */
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  /** Log out an user. */
  /** Status change of authentication status is handled by initAuthListener. */
  logout() {
    /** Get rid of the current token. */
    this.afauth.auth.signOut();
  }

  /** Check whether the user has been authenticated */
  isAuth() {
    return this.isAuthenticated;
  }
}
