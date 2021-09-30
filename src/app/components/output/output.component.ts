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

  text = "";
  arr = [];
  single = {};

  constructor(private docsService: DocsService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.getAll()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['update']) {
      this.getAll();
    }
  }

  getAll() {
    this.docsService.fetchDocs(this.token)
        .subscribe((data) => {
          this.arr = [];
          Object.values(data).forEach(item => {
            if(item["permissions"]) {
              let permissionsArr = Object.values(item["permissions"])
              console.log(permissionsArr);
              if (permissionsArr.includes(this.active)) {
                this.arr.push(item)
              }
            }
          });
        })
  }

  openDoc(id): void {
    this.socketService.createRoom(id);
    console.log(`room ${id} created`);
    this.linkClick.emit(id);
    this.docsService.fetchOne(id, this.token)
      .subscribe((data) => {
        this.single = data[0].content;
        console.log("från databasen")
      });
  }
}
