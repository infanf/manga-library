import { Injectable } from '@angular/core';
import { FirebaseService } from '@app/firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebase: FirebaseService) { }

  async signUp(email: string, password: string) {
    const result = await this.firebase.signUp(email, password);
    return result;
  }

  async signIn(email: string, password: string) {
    const result = await this.firebase.signIn(email, password);
    return result;
  }

  async googleSignIn() {
    const result = await this.firebase.googleSignIn();
    return result;
  }

  async signOut() {
    const result = await this.firebase.signOut();
    return result;
  }
}
