import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private readonly router = inject(Router);
  userData: any = null;
  registerUser(data: object): Observable<any> {
    return this.http.post(`${environment.authApi}/signup`, data);
  }

  loginUser(data: object): Observable<any> {
    return this.http.post(`${environment.authApi}/signin`, data);
  }

  saveUserData(): void {
    if (localStorage.getItem('usertoken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('usertoken') || '');
    }
  }
  logout(): void {
    localStorage.removeItem('usertoken');
    this.userData = null;
    this.router.navigate(['/login']);
  }
  setEmailVerify(data: object): Observable<any> {
    return this.http.post(`${environment.authApi}/forgotPasswords`, data);
  }
  resetCodeVerfiy(data: object): Observable<any> {
    return this.http.post(`${environment.authApi}/verifyResetCode`, data);
  }
  setNewPassword(data: object): Observable<any> {
    return this.http.put(`${environment.authApi}/resetPassword`, data);
  }
}
