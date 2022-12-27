import { Component } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "mangalib-sign-up",
  templateUrl: "./sign-up.component.html",
  styles: [],
})
export class SignUpComponent {
  email = "";
  password = "";
  constructor(private authService: AuthService) {}
  async signUp(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) return;
    const response = await this.authService.signUp(this.email, this.password);
    console.log(response);
  }
  async signIn(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) return;
    const response = await this.authService.signIn(this.email, this.password);
    console.log(response);
  }
  async googleSignIn(event: Event) {
    event.preventDefault();
    const response = await this.authService.googleSignIn();
    console.log(response);
  }
}
