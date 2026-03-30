import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WorkoutsPage } from './pages/workouts/workouts';
import { WorkoutDetail } from './pages/workouts/workout-detail/workout-detail';
import { Coaches } from './pages/coaches/coaches';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'workouts', component: WorkoutsPage },
  { path: 'workout/:title', component: WorkoutDetail },
  { path: 'coaches', component: Coaches },
  { path: '**', redirectTo: '' },
];
