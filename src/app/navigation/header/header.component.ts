import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  /** Used to emit an event to app.component.html */
  /** @Output() make it an listenable event which can be accessed from outsie */
  @Output() sideNavToggle = new EventEmitter<void>();

  /** Indicate whether the user has been authenticated or not. */
  isAuth = false;

  /** Used to unsubscribe the Observable to clear up memory. */
  authSubscription: Subscription;

  /** Inject services used in this component */
  constructor(private authService: AuthService) { }

  ngOnInit() {
    /** Listen to the authChange event defined in authService to get
     *  the current authentication status of the user.
     *  authStatus: a boolean indicating the authentication status.
      */
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  /** This method will be called when the header button is clicked */
  onToggleSidenav() {
    /** Emit an event to app.component */
    this.sideNavToggle.emit();
  }

  /** Used to log out the user. */
  onLogout() {
    this.authService.logout();
  }

  /** Unsubscrible the observable when the component is unloaded. */
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
