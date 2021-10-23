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

  it('should create editor component', () => {
    expect(component).toBeTruthy();
  });

  it('entering text should trigger eventemitter to send it to parent', () => {
    component.editor = "text";
    fixture.detectChanges();
    const onClickMock = spyOn(component, 'sendContent');
    fixture.debugElement.query(By.css(".editor")).triggerEventHandler('keyup', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('entering title should trigger eventemitter to send it to parent', () => {
    const onClickMock = spyOn(component, 'sendTitle');
    fixture.debugElement.query(By.css("#title")).triggerEventHandler('input', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should show text editor and comments but hide code editor and exec button if set to text', () => {
    component.editor = "text";
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    console.log(compiled);
    expect(compiled.querySelector('#textEditor')).toBeTruthy();
    expect(compiled.querySelector('.comment-form')).toBeTruthy();
    expect(compiled.querySelector('#code')).toBeFalsy();
    expect(compiled.querySelector('.exec')).toBeFalsy()
});

it('should show code editor and exec button but hide text editor and comments if set to code', () => {
  component.editor = "code";
  fixture.detectChanges();
  const compiled = fixture.nativeElement;
  expect(compiled.querySelector('#code')).toBeTruthy();
  expect(compiled.querySelector('.exec')).toBeTruthy()
  expect(compiled.querySelector('#textEditor')).toBeFalsy();
  expect(compiled.querySelector('.comment-form')).toBeFalsy();
});

it('should trigger execute code function on button click', () => {
  component.editor = "code";
  fixture.detectChanges();
  const onClickMock = spyOn(component, 'exec');
  fixture.debugElement.query(By.css(".exec")).triggerEventHandler('click', null);
  expect(onClickMock).toHaveBeenCalled();
});

// Testing comments functionality

it('should show comment button if a document is opened but hide it if the document is new and unsaved', () => {
  component.editor = "text";
  const compiled = fixture.nativeElement;
  fixture.detectChanges();
  expect(compiled.querySelector('#newComment')).toBeFalsy();
  expect(compiled.querySelector('#saveComment')).toBeFalsy();

  component.singleId = "34534";
  fixture.detectChanges();
  expect(compiled.querySelector('#newComment')).toBeTruthy();
  expect(compiled.querySelector('#saveComment')).toBeFalsy();
});

it('should show comment input form and save comment button if a selection is made but hide it if not', () => {
  component.editor = "text";
  component.singleId = "34534";
  component.commentText = "Hello world";
  fixture.detectChanges();
  const compiled = fixture.nativeElement;
  expect(compiled.querySelector('#comment')).toBeTruthy();
  expect(compiled.querySelector('#newComment')).toBeTruthy();
  expect(compiled.querySelector('#saveComment')).toBeTruthy();
});

it('should show comments section for a document if it has comments and hide comments section if not', () => {
  component.editor = "text";
  component.singleId = "34534";
  fixture.detectChanges();
  const compiled = fixture.nativeElement;
  expect(compiled.querySelector('.comment-list')).toBeFalsy();

  component.singleComments = [{"text": "text", "comment": "comment", "user": "user"}, {"text": "text", "comment": "comment", "user": "user"}, {"text": "text", "comment": "comment", "user": "user"}];
  fixture.detectChanges();
  
  expect(compiled.querySelector('.comment-list')).toBeTruthy();
  expect(compiled.querySelector('.comment-list .text')).toBeTruthy();
  expect(compiled.querySelector('.comment-list .content')).toBeTruthy();
  expect(compiled.querySelector('.comment-list .user')).toBeTruthy();

  let l = fixture.debugElement.queryAll(By.css('.comment-list .text')).length;
  expect(l).toEqual(3);

  component.singleComments.push({"text": "text", "comment": "comment", "user": "user"});
  fixture.detectChanges();
  let l2 = fixture.debugElement.queryAll(By.css('.comment-list .text')).length;
  expect(l2).toEqual(4);

});

it('comment button should trigger function', () => {
  component.editor = "text";
  component.singleId = "34534";
  component.commentText = "Hello";
  fixture.detectChanges();
  const onClickMock = spyOn(component, 'comment');
  fixture.debugElement.query(By.css('#newComment')).triggerEventHandler('click', null);
  expect(onClickMock).toHaveBeenCalled();
});

it('save button should trigger eventemitter', () => {
  component.editor = "text";
  component.singleId = "34534";
  component.commentText = "Hello";
  fixture.detectChanges();
  const onClickMock = spyOn(component, 'saveComment');
  fixture.debugElement.query(By.css('#saveComment')).triggerEventHandler('click', null);
  expect(onClickMock).toHaveBeenCalled();
});

it('clicking comment should trigger highlight function', () => {
  component.editor = "text";
  component.singleId = "34534";
  component.singleComments = [{"text": "text", "comment": "comment", "user": "user"}];
  fixture.detectChanges();

  const onClickMock = spyOn(component, 'highlight');
  fixture.debugElement.query(By.css('.comment')).triggerEventHandler('click', null);
  expect(onClickMock).toHaveBeenCalled();
});

it('clicking comment should add highlight if substring is present', () => {
  component.editor = "text";
  component.singleId = "34534";
  component.singleContent = "Detta är en text om ingenting.";
  component.singleComments = [{"text": "text", "comment": "comment", "user": "user"}];
  fixture.detectChanges();

  component.highlight("text");
  fixture.detectChanges();
  expect(component.singleContent).toEqual('Detta är en <span style="background-color: yellow;">text</span> om ingenting.');
});

it('strip highlight function should work', () => {
  component.singleContent = 'Detta är en <span style="background-color: yellow;">text</span> om ingenting.';
  fixture.detectChanges();
  component.removeYellow();
  fixture.detectChanges();
  expect(component.singleContent).toEqual("Detta är en text om ingenting.");
});

});
