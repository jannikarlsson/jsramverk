import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() buttonClick = new EventEmitter();
  @Output() buttonClear = new EventEmitter();
  @Output() printClick = new EventEmitter();
  @Input() editor: string;

  faSave = faSave;
  faFile = faFile;
  faPrint = faPrint;

  constructor() { }

  ngOnInit(): void {
  }

  clearButton() {
    this.buttonClear.emit("clicked");
  }

  saveButton() {
    this.buttonClick.emit("clicked");
  }

  printButton() {
    this.printClick.emit("clicked");
  }
}
