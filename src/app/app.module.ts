import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { environment } from "@env/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "@services/auth.service";
import { DashboardComponent } from "@components/dashboard/dashboard.component";
import { SignInComponent } from "@components/sign-in/sign-in.component";
import { SignUpComponent } from "@components/sign-up/sign-up.component";
import { ForgotPasswordComponent } from "@components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "@components/verify-email/verify-email.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
