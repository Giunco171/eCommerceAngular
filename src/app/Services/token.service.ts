import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setToken(token: string | null): void {
    this.tokenSubject.next(token);
  }

  getToken(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }
 
}