import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Auth {
  data: object;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage;
  docs = "https://jsramverk-editor-jaka19.azurewebsites.net/auth/"
  gq = "https://jsramverk-editor-jaka19.azurewebsites.net/graphql"
  // docs = "http://localhost:1337/auth/"
  // gq = "http://localhost:1337/graphql"

  constructor(private http: HttpClient) { }

  // Validates user and logs in

  login(data) {
    let url = this.docs + "login"
    return this.http.post<any>(url, data)
  }

  // Gets list of all users for permissions

  fetchUsersGQ(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "x-access-token": token
      })
    };
    return this.http.post<any>(this.gq, {"query": "query{users{username}}"}, httpOptions);
  }

  // Registers new user

  register(data) {
    let url = this.docs + "register"
    console.log(data);
    console.log(url)
    return this.http.post<any>(url, data).subscribe({
      next: ret => {
        console.log("Success!")
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    });
  }
  
}
