import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import { EditorComponent } from './editor.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };
const config: SocketIoConfig = { url: 'https://jsramverk-editor-jaka19.azurewebsites.net', options: {} };


describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorComponent], 
      imports: [HttpClientTestingModule, SocketIoModule.forRoot(config)],
      providers: [ SocketService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('entering text should trigger eventemitter', () => {
    const onClickMock = spyOn(component, 'sendContent');
    fixture.debugElement.query(By.css("quill-editor")).triggerEventHandler('keyup', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('entering title should trigger eventemitter', () => {
    const onClickMock = spyOn(component, 'sendTitle');
    fixture.debugElement.query(By.css("#title")).triggerEventHandler('input', null);
    expect(onClickMock).toHaveBeenCalled();
  });
});
