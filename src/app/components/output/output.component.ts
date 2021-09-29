import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() linkClick = new EventEmitter();

  text = "";
  arr = [];
  single = {};

  constructor(private docsService: DocsService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.docsService.fetchDocs(this.token)
        .subscribe((data) => {
          Object.values(data).forEach(item => {
            if(item["permissions"]) {
              let permissionsArr = Object.values(item["permissions"])
              console.log(permissionsArr);
              if (permissionsArr.includes(this.active)) {
                this.arr.push(item)
              }
            }
            
          });
          // this.arr = Object.values(data);
          // console.log(this.arr);
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
