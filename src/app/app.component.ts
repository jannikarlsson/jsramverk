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
    console.log(this.filePermissions)
  }

  receiveToken(data: object) {
    this.active = data["data"].user.username;
    this.token = data["data"].token;
    console.log(this.token);
    console.log(this.active);
  }

  openOne($event: any): void {
    this.docsService.fetchOne($event, this.token)
      .subscribe((data) => {
        this.singleId = data[0]._id;
        this.singleContent = data[0].content;
        this.singleTitle = data[0].title;
        this.filePermissions = data[0].permissions;
        this.secretTitle = this.singleTitle;
        this.secretContent = this.singleContent;
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
      this.docsService.sendDocs({title: this.secretTitle, content: this.secretContent, owner: this.active, permissions: this.filePermissions}, this.token)
      this.msg = "";
      this.update += 1;
    } else {
      this.msg = "Du måste ge dokumentet ett namn för att kunna spara.";
    }
  }

  clearForm($event: any): void {
    this.singleContent = "";
    this.singleTitle = "";
    this.singleId = "";
    this.secretContent = "";
    this.secretTitle = "";
    this.msg = "";
    this.filePermissions = [this.active];
  }
}
