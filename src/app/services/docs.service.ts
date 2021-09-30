import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Docs {
  data: object;
}

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  errorMessage;
  docs = "https://jsramverk-editor-jaka19.azurewebsites.net/docs/"
  // docs = "http://localhost:1337/docs/"

  constructor(private http: HttpClient) { }

  fetchDocs(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "x-access-token": token
      })
    };
    return this.http.get<Docs>(this.docs, httpOptions);
  }

  fetchOne(id, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "x-access-token": token
      })
    };
    return this.http.get<Docs>(this.docs + id, httpOptions);
  }

  updateDoc(id, data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "x-access-token": token
      })
    };
    let url = this.docs + id;
    return this.http.post<any>(url, data, httpOptions).subscribe({
      next: ret => {
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
          console.log("ERROR")
      }
    });
  }

  sendDocs(data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "x-access-token": token
      })
    };
    return this.http.post<any>(this.docs, data, httpOptions).subscribe({

      next: ret => {
        console.log(ret);
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    });
  }
}
