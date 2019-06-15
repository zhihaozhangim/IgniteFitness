import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /** Inject services needed. */
  constructor(private authService: AuthService) {}

  /** It will be called as long as the app is launched */
  ngOnInit() {
    /** Always listen to the authentication status change.   */
    this.authService.initAuthListener();
  }
}
