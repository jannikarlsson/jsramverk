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
        this.singleId = data[0]._id;
        this.singleContent = data[0].content;
        this.singleTitle = data[0].title;
        this.secretTitle = this.singleTitle;
        this.secretContent = this.singleContent;
      });
  }

  printContent($event: any): void {
    if (this.singleId && this.secretTitle) {
      this.docsService.updateDoc(this.singleId, {title: this.secretTitle, content: this.secretContent});
      this.msg = "";
    } else if (this.secretTitle) {
      this.docsService.sendDocs({title: this.secretTitle, content: this.secretContent})
      this.msg = "";
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
  }
}
