import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DocsService } from '../../services/docs.service';
import { SocketService } from '../../services/socket.service';

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
  @Input() update: number;
  @Output() linkClick = new EventEmitter();

  // text = "";
  arrGQ = [];
  // single = {};

  constructor(private docsService: DocsService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.getAllGQ();
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
        })
  }

  // Opens single document using GraphQL

  openDoc(id): void {
    this.socketService.createRoom(id);
    console.log(`room ${id} created`);
    this.linkClick.emit(id);
  }
}
