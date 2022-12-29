import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'mangalib-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [
  ]
})
export class SignUpComponent {
constructor(public authService: AuthService) { }
}
