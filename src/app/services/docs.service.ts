import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Docs {
  data: object;
}

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  errorMessage;

  constructor(private http: HttpClient) { }

  fetchDocs() {
    return this.http.get<Docs>("https://jsramverk-editor-jaka19.azurewebsites.net/docs");
  }

  fetchOne(id) {
    return this.http.get<Docs>("https://jsramverk-editor-jaka19.azurewebsites.net/docs/" + id);
  }

  updateDoc(id, data) {
    let url = "https://jsramverk-editor-jaka19.azurewebsites.net/docs/" + id;
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
    return this.http.post<any>("https://jsramverk-editor-jaka19.azurewebsites.net/docs", data).subscribe({
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
