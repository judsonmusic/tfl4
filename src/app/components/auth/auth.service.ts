import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login() {
    return this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
