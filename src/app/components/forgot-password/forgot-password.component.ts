import { Component } from "@angular/core";
import { AuthService } from "@services/auth.service";

@Component({
  selector: "mangalib-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styles: [],
})
export class ForgotPasswordComponent {
  constructor(public authService: AuthService) {}
}
