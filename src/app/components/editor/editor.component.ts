import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { DocsService } from '../../services/docs.service';
import { AuthService } from '../../services/auth.service';


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
  @Input() active: string;
  @Input() token: string;
  @Output() saveEvent = new EventEmitter();
  @Output() saveTitle = new EventEmitter();
  @Output() savePermissions = new EventEmitter();

  editorTitle: string = "";
  editorForm: FormGroup;
  tempContent;
  allUsers = [];
  checkedUsers = [];

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link']
    ]
  }

  constructor(private socketService: SocketService, private docsService: DocsService, private authService: AuthService) { }

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
        console.log("updated data")
    });
    this.authService.fetchUsers()
        .subscribe((data) => {
          Object.values(data).forEach(item => {
            this.allUsers.push(item["username"])
            })
          });
    this.checkedUsers.push(this.active);
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
      this.docsService.updateDoc(this.singleId, {title: this.singleTitle, content: this.tempContent}, this.token);
    }
  }

  sendTitle() {
    this.editorTitle = this.editorForm.get('title').value;
    this.saveTitle.emit(this.editorTitle);
  }

  check(value) {
    console.log(value);
    if (this.checkedUsers.includes(value)) {
      this.checkedUsers.splice(this.checkedUsers.indexOf(value), 1)
    } else {
      this.checkedUsers.push(value);
    }
    console.log(this.checkedUsers)
    this.savePermissions.emit(this.checkedUsers);
  }
}
