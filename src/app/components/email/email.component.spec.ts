import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailComponent } from './email.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };
const config: SocketIoConfig = { url: 'https://jsramverk-editor-jaka19.azurewebsites.net', options: {} };

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailComponent ],
      imports: [HttpClientTestingModule, SocketIoModule.forRoot(config)],
      providers: [ SocketService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.emailForm).toBeTruthy();
  });
});
