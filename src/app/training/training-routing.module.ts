import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.guard';

/** training related route. training component will be loaded lazily. */
const routes: Routes = [
  /** '' because it will be appended to 'training' in app-routing. */
  { path: '', component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // this routes will be added to root routes.
  exports: [RouterModule]
})
export class TrainingRoutingModule {
}
