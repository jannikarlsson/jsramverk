import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @Output() saveEvent = new EventEmitter();

  editorContent: string = "";
  editorForm: FormGroup;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      // ['blockquote', 'code-block'],
      ['code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],
      // [{ 'indent': '-1'}, { 'indent': '+1' }],
      // [{ 'direction': 'rtl' }],
      // [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      // [{ 'color': [] }, { 'background': [] }],
      // [{ 'font': [] }],
      // [{ 'align': [] }],
      // ['clean'],
      // ['link', 'image', 'video']
      ['link']
    ]
  }

  constructor() { }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }

  sendContent() {
    this.editorContent = this.editorForm.get('editor').value;
    this.saveEvent.emit(this.editorContent);
  }

}
