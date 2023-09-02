import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/authResponse';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient,
  ) { }

  private apiUrl = "http://localhost:3000/api"

  public getListHome(): Observable<List[]> {

    return this.http.get<any>(`${this.apiUrl}/list-home`);
  }

  public addItem(formData: List): Observable<boolean> {


    return this.http.post<any>(`${this.apiUrl}/items`, formData);
  }

  public removeItem(item: List): Observable<boolean> {


    return this.http.delete<any>(`${this.apiUrl}/items/${item.name}`);
  }

  public updateStatus(item: List, status: string): Observable<boolean> {



    return this.http.put<any>(`${this.apiUrl}/items/${status}`, item);
  }

  public updateItem(formData: List): Observable<any> {


    return this.http.put<any>(`${this.apiUrl}/edit-item`, formData);
  }

  public searchItem(item: String): Observable<List[]> {


    return this.http.get<List[]>(`${this.apiUrl}/items/${item}`);

  }


  //Authorization Calls
  public makeAuthCall(urlPath: string, user: User): Observable<any> {
    const url = `${this.apiUrl}/${urlPath}`;

    return this.http.post<AuthResponse>(url, user)

  }

  public login(user: User): Observable<any> {
      return this.makeAuthCall('login', user)
  }

  public register(user: User): Observable<any> {
    return this.makeAuthCall('register', user);
  }

 }

