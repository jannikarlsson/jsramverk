import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OutputComponent } from './output.component';
import {By} from "@angular/platform-browser";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';

// const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };
const config: SocketIoConfig = { url: 'https://jsramverk-editor-jaka19.azurewebsites.net', options: {} };


describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputComponent ],
      imports: [HttpClientTestingModule, SocketIoModule.forRoot(config)],
      providers: [ SocketService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have content', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('content should be array', () => {
  //   expect(component).toEqual(jasmine.any(Array));
  // });

  
});
