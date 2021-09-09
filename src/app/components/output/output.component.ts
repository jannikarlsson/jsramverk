import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocsService } from '../../services/docs.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
  providers: [ DocsService ],
})
export class OutputComponent implements OnInit {
  
  @Input() editorContent: string;
  @Output() linkClick = new EventEmitter();

  text = "";
  arr = [];
  single = {};

  constructor(private docsService: DocsService) { }

  ngOnInit(): void {
    this.docsService.fetchDocs()
        .subscribe((data) => {
          this.arr = Object.values(data);
        })
  }

  openDoc(id): void {
    this.linkClick.emit(id);
    this.docsService.fetchOne(id)
      .subscribe((data) => {
        this.single = data[0].content;
        console.log(this.single);
      });
  }

}
