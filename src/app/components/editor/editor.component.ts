import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @Input() singleContent: string;
  @Input() singleTitle: string;
  @Output() saveEvent = new EventEmitter();
  @Output() saveTitle = new EventEmitter();

  editorContent: string = "";
  editorTitle: string = "";
  editorForm: FormGroup;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link']
    ]
  }

  constructor() { }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null),
      'title': new FormControl(null)
    })
    this.singleContent;
    this.singleTitle;
  }

  sendContent() {
    this.editorContent = this.editorForm.get('editor').value;
    this.saveEvent.emit(this.editorContent);
  }

  sendTitle() {
    this.editorTitle = this.editorForm.get('title').value;
    this.saveTitle.emit(this.editorTitle);
  }

}
