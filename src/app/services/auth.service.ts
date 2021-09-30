import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Auth {
  data: object;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage;
  docs = "https://jsramverk-editor-jaka19.azurewebsites.net/auth/"
  // docs = "http://localhost:1337/auth/"

  constructor(private http: HttpClient) { }

  login(data) {
    let url = this.docs + "login"
    return this.http.post<any>(url, data)
  }

  fetchUsers() {
    return this.http.get<any>(this.docs);
  }

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
