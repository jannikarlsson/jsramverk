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
    const onClickMock = spyOn(component, 'printButton');
    fixture.debugElement.query(By.css('#print')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

});
