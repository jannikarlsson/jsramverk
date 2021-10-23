import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {By} from "@angular/platform-browser";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('clear button should trigger eventemitter', () => {
    const onClickMock = spyOn(component, 'clearButton');
    fixture.debugElement.query(By.css('#clear')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('save button should trigger eventemitter', () => {
    const onClickMock = spyOn(component, 'saveButton');
    fixture.debugElement.query(By.css('#save')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('print button should trigger eventemitter', () => {
    component.editor = "text";
    fixture.detectChanges();
    const onClickMock = spyOn(component, 'printButton');
    fixture.debugElement.query(By.css('#print')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should show print button if set to text but not if set to code', () => {
    component.editor = "text";
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    console.log(compiled);
    expect(compiled.querySelector('#print')).toBeTruthy();
    component.editor = "code";
    fixture.detectChanges();
    expect(compiled.querySelector('#print')).toBeFalsy();
});

});
