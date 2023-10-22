import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth-token'

  private baseUrl = 'http://localhost:8081'

  constructor(private http: HttpClient,
    private router: Router) { }

  register(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookstore/register`, formData);
  }

  validate(otpByUser: any): Observable<any> {
    const params = new HttpParams().set('otpByUser', otpByUser)
    return this.http.post(`${this.baseUrl}/bookstore/validate`,null,{params});
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookstore/login`, credentials);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['user-login']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  

  
}
