// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {

  // Configure Auth0
  options: any = {
    theme: {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Itransition-logo.png',
      primaryColor: '#31324F',
    },
    allowedConnections: ['Username-Password-Authentication'],
    allowForgotPassword: false,
    languageDictionary: {
      title: "Get started now!",
    },
    loginAfterSignUp: false,
    prefill: false,
    rememberLastLogin: false
    // additionalSignUpFields: [{
    //   name: "first_name",
    //   placeholder: "Enter your first name"
    // },
    //   {
    //     name: "last_name",
    //     placeholder: "Enter your last name"
    //   }],
    // focusInput: true,
    // loginAfterSignUp: false
  }

  lock = new Auth0Lock('01zprkxxKgAkNTyYRA2f9cl6ukv7779w', 'wieseknows.eu.auth0.com', this.options);

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult: any) => {
      this.lock.getProfile(authResult.idToken, function (error: any, profile: any){
        if (error) {
          throw new Error(error);
        }
        if (!profile.email_verified) {
          window.alert('You need to verify your email before login.');
          throw new Error(error);
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
