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
  // docs = "https://jsramverk-editor-jaka19.azurewebsites.net/docs/"
  // gq = "https://jsramverk-editor-jaka19.azurewebsites.net/graphql"
  docs = "http://localhost:1337/docs/"
  gq = "http://localhost:1337/graphql"

  constructor(private http: HttpClient) { }

  // Gets all user's documents

  fetchDocsGQ(username, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "x-access-token": token
      })
    };
    const query = `query{documents(username: "${username}"){_id, title}}`;
    return this.http.post<any>(this.gq, { "query": query }, httpOptions);
  }

  // Gets single document

  fetchOneGQ(id, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "x-access-token": token
      })
    };
    // const query = `query{singleDoc(id: "${id}"){_id, title, content, owner, permissions, comments}}`;
    // return this.http.post<any>(this.gq, {"query": query}, httpOptions);
    let url = this.docs + id
    return this.http.get<Docs>(url, httpOptions);
  }



  // getComments(id, token) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       "x-access-token": token
  //     })
  //   };
  //   const query = `query{singleDoc(id: "${id}"){comments}}`;
  //   return this.http.post<any>(this.gq, {"query": query}, httpOptions);
  // }

  // Updates document in database

  updateDoc(id, data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
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

  // Send comment to backend

  addComment(data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "x-access-token": token
      })
    };
    let url = this.docs + "comment";
    return this.http.post<any>(url, data, httpOptions).subscribe({
      next: ret => {
        console.log(ret)
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  addPermission(data, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "x-access-token": token
      })
    };
    let url = this.docs + "permission";
    return this.http.post<any>(url, data, httpOptions).subscribe({
      next: ret => {
        console.log(ret)
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  sendToPrinter(data) {
    let url = this.docs + "print";
    return this.http.post<any>(url, data).subscribe({
      next: ret => {
        let arr = new Uint8Array(ret.data);
        let file = new Blob([arr], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  executeCode(data) {
    let url = "https://execjs.emilfolino.se/code";
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json'})

    console.log(data);
    console.log(headers);

    return this.http.post<any>(url, JSON.stringify(data), {headers: headers}).subscribe({
      next: ret => {
        console.log(ret);
        let decodedOutput = atob(ret.data);
        console.log(decodedOutput); // outputs: hej
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    });
  }

  // executeCode(inp) {
  //   var data = {
  //     code: btoa(inp)
  // };
  
  // fetch("http://execjs.emilfolino.se/code", {
  //     body: JSON.stringify(data),
  //     headers: {
  //         'content-type': 'application/json'
  //       },
  //     method: 'POST'
  // })
  // .then(function (response) {
  //     return response.json();
  // })
  // .then(function(result) {
  //     let decodedOutput = atob(result.data);
  //     console.log(decodedOutput); // outputs: hej
  // });
  // }
}
