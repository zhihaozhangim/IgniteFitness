import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  /** Reactive Forms approach. */
  loginForm: FormGroup;

  /** Indicates whehter the loading starts or finishes in order to show or hide spinner. */
  isLoading = false;

  /** Used to unsubscribe the loadingStateChanged Observable from UIService. */
  private loadingSubs: Subscription;

  /** Inject services used in this component. */
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {

    /** Listen to the event when loading should start or stop.  */
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe (isLoading => {
      this.isLoading = isLoading;
    });

    /** ReactiveFormsModule */
    this.loginForm = new FormGroup({
      /** initial value is ''. validators is a list of requirements of the field */
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  /** When submit button in the log in form is clicked, log in
   *  the user.
   */
  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  /** Unsubscribe the Obeservable when the component is unloaded. */
  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
