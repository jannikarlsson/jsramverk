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
  gq = "https://jsramverk-editor-jaka19.azurewebsites.net/graphql"
  // docs = "http://localhost:1337/docs/"
  // gq = "http://localhost:1337/graphql"

  constructor(private http: HttpClient) { }

  // Gets all user's documents

  fetchDocsGQ(username, token) {
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "x-access-token": token
          })
        };
    const query = `query{documents(username: "${username}"){_id, title}}`;
    return this.http.post<any>(this.gq, {"query": query}, httpOptions);
  }

  // Gets single document

  fetchOneGQ(id, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "x-access-token": token
      })
    };
    const query = `query{singleDoc(id: "${id}"){_id, title, content, owner, permissions}}`;
    return this.http.post<any>(this.gq, {"query": query}, httpOptions);
  }

  // Updates document in database

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

  // Adds new document to database

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
