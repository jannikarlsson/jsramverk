import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorComponent ]
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
    fixture.debugElement.query(By.css("quill-editor")).triggerEventHandler('onContentChanged', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('entering title should trigger eventemitter', () => {
    const onClickMock = spyOn(component, 'sendTitle');
    fixture.debugElement.query(By.css("#title")).triggerEventHandler('input', null);
    expect(onClickMock).toHaveBeenCalled();
  });
});
