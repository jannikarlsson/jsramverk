import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

export interface Docs {
  data: object;
}

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  errorMessage;

  constructor(private http: HttpClient, private socket: Socket) { }

  fetchDocs() {
    // return this.http.get<Docs>("https://jsramverk-editor-jaka19.azurewebsites.net/docs");
    return this.http.get<Docs>("http://localhost:1337/docs");
  }

  fetchOne(id) {
    // return this.http.get<Docs>("https://jsramverk-editor-jaka19.azurewebsites.net/docs/" + id);
    return this.http.get<Docs>("http://localhost:1337/docs/" + id);

  }

  updateDoc(id, data) {
    // let url = "https://jsramverk-editor-jaka19.azurewebsites.net/docs/" + id;
    let url = "http://localhost:1337/docs/" + id;
    return this.http.post<any>(url, data).subscribe({
      next: ret => {
        console.log(ret);
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    });
  }

  sendDocs(data) {
    // return this.http.post<any>("https://jsramverk-editor-jaka19.azurewebsites.net/docs", data).subscribe({
    return this.http.post<any>("http://localhost:1337/docs", data).subscribe({

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
