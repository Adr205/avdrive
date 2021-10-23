import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_SERVER: String = 'http://localhost:3050';
  authSubject = new BehaviorSubject(false);
  private token!: String;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.AUTH_SERVER}/register`, user);
    // .pipe(
    //   tap((res: JwtResponse) => {
    //     if (res) {
    //       //Guardar token
    //       this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn,res.dataUser.email,res.dataUser.fName,res.dataUser.id);
    //     }
    //   })
    // );
  }

  login(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.AUTH_SERVER}/login`, user).pipe(
      tap((res: JwtResponse) => {
        if (res) {
          //Guardar token
          this.saveToken(
            res.dataUser.accessToken,
            res.dataUser.expiresIn,
            res.dataUser.email,
            res.dataUser.fName,
            res.dataUser.id,
            res.dataUser.priv
          );
        }
      })
    );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    localStorage.removeItem('Email');
    localStorage.removeItem('Name');
    localStorage.removeItem('ID');
    localStorage.removeItem('Priv');
  }

  private saveToken(
    token: string,
    expiresIn: string,
    email: String,
    fName: String,
    id: Number,
    priv: String
  ): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    localStorage.setItem('Email', String(email));
    localStorage.setItem('Name', String(fName));
    localStorage.setItem('ID', String(id));
    localStorage.setItem('Priv', String(priv));

    this.token = token;
  }

  getToken(): String {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN') || '';
    }
    return this.token;
  }
}
