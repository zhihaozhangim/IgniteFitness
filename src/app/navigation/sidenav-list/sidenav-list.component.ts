import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  /** Used to emit an event to app.component.html */
  /** @Output() will make the event emiter can be listened from outside */
  @Output() closeSidenav = new EventEmitter<void>();

  /** Indicate whehter the user has been authenticated. */
  isAuth = false;

  /** Used to unsubscribe the Observable. */
  authSubscription: Subscription;

  /** Inject services used in this component. */
  constructor(private authService: AuthService) { }

  /** Subscribe the Observale authChange defined in authService.
   *  authStatus is a boolean indicating whehter the user has been authenticated.
   */
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  /** This method will be called when the items on side-nav is clicked */
  onClose() {
    /** Emit an event to app.component */
    this.closeSidenav.emit();
  }

  /** Used to log out the user. */
  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  /** Subscribe the Observable when the component is unloaded. */
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
