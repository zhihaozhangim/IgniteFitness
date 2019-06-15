import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  /** Set a limit to the age of user. */
  maxDate;

  /** Indicates whehter the loading starts or finishes in order to show or hide spinner. */
  isLoading = false;

  /** Used to unsubscribe the loadingStateChanged Observable from UIService. */
  private loadingSubs: Subscription;

  /** Inject services used in this component */
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {

    /** Listen to the event when loading should start or stop.  */
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    // limit the age of the user to be at 18 years old.
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  /** This NgForm is available because the local reference #f of the form
   *  it uses template form approach.
   *  When the submit button in sign up form is clicked, registerUser
   *  method in AuthService should be called.
  */
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  /** Unsubscribe the Obeservable when the component is unloaded. */
  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
