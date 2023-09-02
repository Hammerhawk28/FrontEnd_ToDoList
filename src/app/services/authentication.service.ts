import { Injectable, Inject } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { ListDataService } from './list-data.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = "http://localhost:3000/api"


  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,

    private listService: ListDataService
  ) { }

    public registerUser(user: User): Observable<any> {
      return this.listService.register(user);
    }

    public saveToken(token: string): void {
      this.storage.setItem('list-token', token);
    }

    public getToken(): any {
      return this.storage.getItem('list-token');
    }

    public loginUser(user: User): Observable<any> {
      return this.listService.login(user);
    }

    public logout(): void {
      this.storage.removeItem('list-token');
    }

    public isLoggedIn(): boolean {
      const token: string = this.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);
      } else {
        return false;
      }
    }


}
