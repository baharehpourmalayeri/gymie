import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Coach } from '../../core/models/coach.model';
import { CoachService } from '../../core/services/coach.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coaches.html',
})
export class Coaches {
  coaches: Coach[] = [];

  constructor(
    private coachService: CoachService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.coaches = this.coachService.getAll();
  }

  goToCoach(coach: Coach) {
    this.router.navigate(['/coach', coach.slug]);
  }
}
