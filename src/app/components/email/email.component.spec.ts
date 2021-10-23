import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailComponent } from './email.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {By} from "@angular/platform-browser";


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

  it('should show input form and button if a saved document is opened but not as default', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.email')).toBeFalsy();

    component.singleId = "3445";
    fixture.detectChanges();
    expect(compiled.querySelector('.email')).toBeTruthy();
  });

  it('should not show invite sent message as default', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#sent')).toBeFalsy();
  });

  it('should show invite sent message when sent', () => {
    component.singleId = "3445";
    component.inviteSent = "";
    const old = component.inviteSent;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    component.send();
    fixture.detectChanges();
    expect(component.inviteSent).not.toEqual(old);
    expect(compiled.querySelector('#sent')).toBeTruthy();
  });

});
