import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DocsService } from '../../services/docs.service';
import { SocketService } from '../../services/socket.service';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faFileCode } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
  providers: [ DocsService, SocketService ],
})
export class OutputComponent implements OnInit {
  
  @Input() editorContent: string;
  @Input() active: string;
  @Input() token: string;
  // @Input() update: number;
  @Input('update') set update(value: any) {
    if (value) {
      console.log(value)
      this.getAllGQ();
    }
  }
  @Input() editor: string;
  @Output() linkClick = new EventEmitter();

  // text = "";
  arrGQ = [];
  // single = {};
  faFileWord = faFileWord;
  faFileCode = faFileCode;
  constructor(private docsService: DocsService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.getAllGQ();
    console.log(this.editor);
  }

  // Updates document list on save

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['update']) {
      this.getAllGQ();
    }
  }

  // Gets documents using GraphQL

  getAllGQ() {
    this.docsService.fetchDocsGQ(this.active, this.token)
        .subscribe((data) => {
          this.arrGQ = data.data["documents"];
          console.log(this.arrGQ)
        })
  }

  // Opens single document using GraphQL

  openDoc(id): void {
    this.socketService.createRoom(id);
    console.log(`room ${id} created`);
    this.linkClick.emit(id);
  }
}
