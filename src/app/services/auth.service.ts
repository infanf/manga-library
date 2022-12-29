import { Injectable, NgZone } from "@angular/core";
import * as auth from "firebase/auth";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@angular/fire/auth";
import {
  Firestore,
  doc,
  DocumentReference,
  setDoc,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: Firestore, // Inject Firestore service
    public afAuth: Auth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.onAuthStateChanged((nextOrObserver) => {
      if (nextOrObserver) {
        this.userData = nextOrObserver;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user")!);
      } else {
        localStorage.setItem("user", "null");
        JSON.parse(localStorage.getItem("user")!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        this.SetUserData(result.user);

        this.afAuth.onAuthStateChanged((nextOrObserver) => {
          if (nextOrObserver) {
            this.router.navigate(["dashboard"]);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return;
    // return this.afAuth.currentUser
    //   .then((u: any) => u.sendEmailVerification())
    //   .then(() => {
    //     this.router.navigate(["verify-email-address"]);
    //   });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return sendPasswordResetEmail(this.afAuth, passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(["dashboard"]);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return signInWithPopup(this.afAuth, provider)
      .then((result) => {
        this.router.navigate(["dashboard"]);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: DocumentReference<any> = doc(this.afs, `users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    setDoc(userRef, userData, { merge: true });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
    });
  }
}