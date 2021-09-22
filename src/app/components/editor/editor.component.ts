import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SocketService } from '../../services/socket.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [ SocketService ]
})
export class EditorComponent implements OnInit {

  @Input() singleContent: string;
  @Input() singleTitle: string;
  @Input() singleId: string;
  @Output() saveEvent = new EventEmitter();
  @Output() saveTitle = new EventEmitter();

  editorContent: string = "";
  editorTitle: string = "";
  editorForm: FormGroup;
  tempContent;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link']
    ]
  }

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null),
      'title': new FormControl(null)
    })
    this.singleTitle;
    this.socketService
      .getText()
      .subscribe((data) => {
        this.singleContent = data.html;
    });
  }
  
  sendContent() {
    this.tempContent = this.editorForm.get('editor').value;
    this.saveEvent.emit(this.tempContent);
    if (this.singleId) {
      let data = {
        _id: this.singleId,
        html: this.tempContent
      };
      this.socketService.sendText(data);
    }
  }

  sendTitle() {
    this.editorTitle = this.editorForm.get('title').value;
    this.saveTitle.emit(this.editorTitle);
  }
}
