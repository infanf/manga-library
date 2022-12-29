import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'mangalib-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent {
constructor(public authService:AuthService) { }
}
