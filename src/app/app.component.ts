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

  constructor(private docsService: DocsService) {
  }

  ngOnInit(): void {
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
        this.singleId = data[0]._id;
        console.log(this.singleContent);
        console.log(this.singleTitle);
        console.log(this.singleId);
      });
  }

  printContent($event: any): void {
    if (this.singleId) {
      let title = this.secretTitle ? this.secretTitle : this.singleTitle;
      this.docsService.updateDoc(this.singleId, {title: title, content: this.secretContent});
    } else {
      let title = this.secretTitle ? this.secretTitle : this.singleTitle;
      this.docsService.sendDocs({title: title, content: this.secretContent})
    }
  }

  clearForm($event: any): void {
    this.singleContent = "";
    this.singleTitle = "";
    this.singleId = "";
  }
}
