import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../models/decoded-token.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  registerForm(userData: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        environment.endPointAuth +
        environment.endPointSignUp,
      userData
    );
  }
  loginForm(userData: Object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        environment.endPointAuth +
        environment.endPointSignIn,
      userData
    );
  }

  logOut() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  decodeToken(): DecodedToken | null {
    try {
      return jwtDecode(this.cookieService.get('token'));
    } catch (error) {
      this.logOut();
      return null;
    }
  }

  verifyEmail(email: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        environment.endPointAuth +
        environment.endPointForgot,
      email
    );
  }
  verifyCode(code: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        environment.endPointAuth +
        environment.endPointVerifyCode,
      code
    );
  }
  resetPass(newData: object): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl +
        environment.endPointAuth +
        environment.endPointResetPassword,
      newData
    );
  }
}
