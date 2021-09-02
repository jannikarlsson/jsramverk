import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() buttonClick = new EventEmitter();

  faSave = faSave;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnClick() {
    this.buttonClick.emit("clicked");
  }
}
