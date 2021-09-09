import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() buttonClick = new EventEmitter();
  @Output() buttonClear = new EventEmitter();

  faSave = faSave;
  faFile = faFile;

  constructor() { }

  ngOnInit(): void {
  }

  clearButton() {
    this.buttonClear.emit("clicked");
  }

  saveButton() {
    this.buttonClick.emit("clicked");
  }
}
