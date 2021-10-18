import { Component, OnInit } from '@angular/core';
import { DocsService } from './services/docs.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DocsService ],
})
export class AppComponent {
  title = 'angular-editor';

  editorContent: string;
  secretContent: string;
  secretTitle: string;
  singleContent: string;
  singleTitle: string;
  singleId: string;
  singleComments: Array<any>;
  editor = "text";
  button = "Byt till kodeditor";
  msg: string;
  active: string;
  token: string;
  filePermissions: Array<any>;
  update = 0;

  constructor(private docsService: DocsService) {
  }

  ngOnInit(): void {
    this.msg = "";
  }

  // Receives editor content

  receiveContent($event: string) {
    this.secretContent = $event;
  }

  // Receives title from editor

  receiveTitle($event: string) {
    this.secretTitle = $event;
  }

  // Receives permissions from editor

  receivePermissions($event) {
    this.filePermissions = $event;
  }

  // Receives token from login function

  receiveToken(data: object) {
    this.active = data["data"].user.username;
    this.token = data["data"].token;
  }

  // Receives comment from editor
  
  receiveComment(data: object) {
    this.docsService.addComment(data, this.token);
  }

  // Opens a document

  openOne($event: any): void {
    this.docsService.fetchOneGQ($event, this.token)
      .subscribe((data) => {
        this.singleId = data["_id"];
        this.singleContent = data["content"];
        this.singleTitle = data["title"];
        this.filePermissions = data["permissions"];
        this.singleComments = data["comments"];
        this.secretTitle = this.singleTitle;
        this.secretContent = this.singleContent;
        this.editor = data["type"];
      });
  }

  // Saves or updates document

  printContent($event: any): void {
    if (this.singleId && this.secretTitle) {
      let res = this.docsService.updateDoc(this.singleId, {title: this.secretTitle, content: this.secretContent, permissions: this.filePermissions}, this.token);
      console.log(res);
      this.msg = "";
    } else if (this.secretTitle) {
      if (!this.filePermissions) {
        this.filePermissions = [this.active];
      }
      this.docsService.sendDocs({title: this.secretTitle, content: this.secretContent, owner: this.active, type: this.editor, permissions: this.filePermissions}, this.token)
      this.msg = "";
      this.update += 1;
    } else {
      this.msg = "Du måste ge dokumentet ett namn för att kunna spara.";
    }
  }

  // Sends editor content to pdf printer

  toPrinter($event: any) {
    this.docsService.sendToPrinter({"title": this.secretTitle, "content": this.secretContent});
  }

  // Starts a new empty document

  clearForm($event: any): void {
    this.singleContent = "";
    this.singleTitle = "";
    this.singleId = "";
    this.secretContent = "";
    this.singleComments = [];
    this.secretTitle = "";
    this.msg = "";
    this.filePermissions = [this.active];
    this.editor = "text";
    this.button = "Byt till kodeditor";
  }

  // Switches between text and code editors

  changeEditor() {
    if (this.editor == "text") {
      this.editor = "code";
      this.button = "Byt till texteditor"
    } else {
      this.editor = "text";
      this.button = "Byt till kodeditor";
    }
  }
    
}
