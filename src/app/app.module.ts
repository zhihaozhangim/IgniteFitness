import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** @angular/animation uses the WebAnimation API that isn't supported by all
 * browsers yet. If you want to support Material component in these browers,
 * you will have to include a polyfill
*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Flex layout module, using flex box to organize components */
import { FlexLayoutModule} from '@angular/flex-layout';

/** Angular Fire, used to sync data from Firebase. */
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

/** This module is used to manage Angular Material Component */
import { MaterialModule } from './material.module';

/** This module is used for routing */
import { AppRoutingModule } from './app-routing.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';

/** Environment config file. */
import { environment } from '../environments/environment';

import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';

/** Used for Firestore related functionalities. */
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Adding meta data to the class
@NgModule({
  declarations: [ // all components used in the project
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [  // other modules
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule, // get access to all angular material modules.
    AppRoutingModule, // routing module
    FlexLayoutModule, // flex box layout
    AngularFireModule.initializeApp(environment.firebase),  // initialize the app with firebase config in env.
    AuthModule, // a module split from app.module, which is related to auth and auth routing.
    AngularFirestoreModule,
  ],
  /** Service in providers means we use the same instance of the Service class
   *  in the entire app.
   */
  providers: [AuthService, TrainingService, UIService], // inject all services, provided here will be singleton.
  bootstrap: [AppComponent],  // inform angular it is the main component
})
export class AppModule { }
