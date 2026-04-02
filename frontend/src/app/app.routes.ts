import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WorkoutsPage } from './pages/workouts/workouts';
import { WorkoutDetail } from './pages/workouts/workout-detail/workout-detail';
import { Coaches } from './pages/coaches/coaches';
import { CoachDetail } from './pages/coaches/coach-details/coach-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'workouts', component: WorkoutsPage },
  { path: 'workout/:slug', component: WorkoutDetail },
  { path: 'coaches', component: Coaches },
  { path: 'coach/:slug', component: CoachDetail },
  { path: '**', redirectTo: '' },
];
