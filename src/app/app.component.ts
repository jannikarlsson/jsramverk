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

  openOne($event: any): void {
    this.docsService.fetchOne($event)
      .subscribe((data) => {
        this.singleContent = data[0].content;
        this.singleTitle = data[0].title;
        this.secretTitle = this.singleTitle;
        this.secretContent = this.singleContent;
        this.singleId = data[0]._id;
      });
  }

  printContent($event: any): void {
    if (this.singleId && this.secretTitle) {
      // let title = this.secretTitle ? this.secretTitle : this.singleTitle;
      this.docsService.updateDoc(this.singleId, {title: this.secretTitle, content: this.secretContent});
      this.msg = "";
    } else if (this.secretTitle) {
      // let title = this.secretTitle ? this.secretTitle : this.singleTitle;
      this.docsService.sendDocs({title: this.secretTitle, content: this.secretContent})
      this.msg = "";
    } else {
      console.log("No title")
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
  }
}
