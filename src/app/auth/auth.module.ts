import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

/** Modules related to Auth. */
/** @NgModule turns this class into a module. */
@NgModule({
  declarations: [SignupComponent, LoginComponent],  // components related to this module.
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule // auth-routing related.
  ],
  exports: []
})
export class AuthModule {

}
