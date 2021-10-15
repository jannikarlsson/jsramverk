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

  receiveContent($event: string) {
    this.secretContent = $event;
  }

  receiveTitle($event: string) {
    this.secretTitle = $event;
  }

  receivePermissions($event) {
    this.filePermissions = $event;
  }

  receiveToken(data: object) {
    this.active = data["data"].user.username;
    this.token = data["data"].token;
  }

  // Tar emot kommentaren och skickar den till docs.service
  
  receiveComment(data: object) {
    this.docsService.addComment(data, this.token);
  }

  openOne($event: any): void {
    // this.docsService.fetchOne($event, this.token)
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

  toPrinter($event: any) {
    this.docsService.sendToPrinter({"title": this.secretTitle, "content": this.secretContent});
  }

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
