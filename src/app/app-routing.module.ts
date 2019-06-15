/** This module defines routes in this app */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  /** AuthGuard class must implement the canLoad interface. */
  /** loadChildren: a keyword for lazy loading, take a string (the module to loaded when the route is loaded.)
   *  (because the string will be analyzed at runtime.)
   *  This route can be loaded only after the user has been authenticated. */
  { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // set it to be the root route of the app.
  exports: [RouterModule],  // export it so that it can be used in app module (configuration has been used).
  /** inject service. (ususlly provides in app.module.ts or a specific
   *  component). But AuthGuard should be provided in the routing. */
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
