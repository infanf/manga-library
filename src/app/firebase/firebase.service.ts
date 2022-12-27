import { Injectable } from "@angular/core";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  private app?: FirebaseApp;
  private auth?: Auth;

  constructor() {
    const firebaseConfig = {
    };

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  signUp(email: string, password: string) {
    if (!this.auth) throw new Error("Firebase auth not initialized");
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string) {
    if (!this.auth) throw new Error("Firebase auth not initialized");
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    if (!this.auth) throw new Error("Firebase auth not initialized");
    return this.auth.signOut();
  }

  googleSignIn() {
    if (!this.auth) throw new Error("Firebase auth not initialized");
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }
}
