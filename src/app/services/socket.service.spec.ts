import { TestBed } from '@angular/core/testing';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socket.service';

// const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };
const config: SocketIoConfig = { url: 'https://jsramverk-editor-jaka19.azurewebsites.net', options: {} };


describe('SocketService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SocketIoModule.forRoot(config) ],
      providers: [ SocketService ]
    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
