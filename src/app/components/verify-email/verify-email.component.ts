import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'mangalib-verify-email',
  templateUrl: './verify-email.component.html',
  styles: [
  ]
})
export class VerifyEmailComponent {
  constructor(public authService: AuthService) { }
}
