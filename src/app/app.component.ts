import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-editor';

  editorContent: string;
  secretContent: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  receiveContent($event: string) {
    this.secretContent = $event;
  }

  printContent($event: any): void {
    console.log(this.secretContent);
    this.editorContent = this.secretContent;
  }
}
