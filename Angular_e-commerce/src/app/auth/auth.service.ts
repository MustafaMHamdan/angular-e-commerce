import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = localStorage.getItem('token');
  constructor() { }
isAuthenticated(){
    return this.isLoggedIn;
  }
}
