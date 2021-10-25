import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { DocsService } from '../../services/docs.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [SocketService]
})
export class EditorComponent implements OnInit {

  @Input() singleContent: string;
  @Input() singleTitle: string;
  @Input() singleId: string;
  @Input() singleComments: Array<any>;
  @Input() active: string;
  @Input() editor: string;
  @Input() token: string;
  @Input() commentText: string;
  @Input() filePermissions: Array<any>;
  @Output() saveEvent = new EventEmitter();
  @Output() saveTitle = new EventEmitter();
  @Output() savePermissions = new EventEmitter();
  @Output() commentEvent = new EventEmitter();

  editorTitle: string = "";
  editorForm: FormGroup;
  tempContent;
  allUsers = [];
  allUsersGQ = [];
  checkedUsers = [];
  content;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link']
    ]
  }

  constructor(private socketService: SocketService, private docsService: DocsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null),
      'title': new FormControl(null),
      'comment': new FormControl(null)
    })
    if (!this.singleComments) {
      this.singleComments = [];
    }
    this.singleTitle;
    this.commentText = "";
    this.socketService
      .getText()
      .subscribe((data) => {
        this.singleContent = data.html;
      });

    // Gets user array using GraphQL

    this.authService.fetchUsersGQ(this.token)
      .subscribe((data) => {
        Object.values(data.data.users).forEach(item => {
          this.allUsersGQ.push(item["username"])
        })
      });
    this.checkedUsers.push(this.active);
  }

  // Emits editor content to app.js, updates database on change

  sendContent() {
    if (this.editor == "code") {
      this.tempContent = this.singleContent;
    } else {
      this.tempContent = this.editorForm.get('editor').value;
      this.tempContent = this.tempContent.replace('<span style="background-color: yellow;">', "");
      this.tempContent = this.tempContent.replace('</span>', "");
    }
    this.saveEvent.emit(this.tempContent);
    if (this.singleId) {
      let data = {
        _id: this.singleId,
        html: this.tempContent
      };
      this.socketService.sendText(data);
      this.docsService.updateDoc(this.singleId, { title: this.singleTitle, content: this.tempContent, permissions: this.checkedUsers }, this.token);
    }
  }

  // Checks box if user is in document permissions, only used for editor.component.html
  isPermitted(person) {
    if (this.filePermissions && this.filePermissions.includes(person)) {
      return true
    } else {
      return false
    }
  }

  // Emits title changes to app.js
  sendTitle() {
    this.editorTitle = this.editorForm.get('title').value;
    this.saveTitle.emit(this.editorTitle);
  }

  // Toggles user permission on check or uncheck, only used for editor.component.html
  check(value) {
    if (this.checkedUsers.includes(value)) {
      this.checkedUsers.splice(this.checkedUsers.indexOf(value), 1)
    } else {
      this.checkedUsers.push(value);
    }
    console.log(this.checkedUsers)
    this.savePermissions.emit(this.checkedUsers);
  }

  // Gets selected text
  comment() {
    let selection = window.getSelection().toString();
    this.commentText = selection.toString();
    this.editorForm.controls['comment'].reset()
  }

  // Saves comment
  saveComment() {
    let commentData = { "id": this.singleId, "text": this.commentText, "comment": this.editorForm.get('comment').value, "user": this.active }
    this.singleComments.push(commentData);
    this.commentEvent.emit(commentData);
    this.commentText = "";
  }

  // Highlights commented text in editor
  highlight(text) {
    this.removeYellow();
    this.singleContent = this.singleContent.replace(text, `<span style="background-color: yellow;">${text}</span>`);
  }

  // Removes highlight from editor
  removeYellow() {
    this.singleContent = this.singleContent.replace('<span style="background-color: yellow;">', "");
    this.singleContent = this.singleContent.replace('</span>', "");
  }

  // Executes javascript from editor
  exec() {
    var data = {
      code: btoa(this.singleContent)
    };
    this.docsService.executeCode(data);
  }
}
