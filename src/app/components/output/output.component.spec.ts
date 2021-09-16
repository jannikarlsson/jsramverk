import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OutputComponent } from './output.component';
import {By} from "@angular/platform-browser";


describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputComponent ],
      imports: [HttpClientTestingModule]
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

  it('should have content', () => {
    expect(component.arr).toBeTruthy();
  });

  it('content should be array', () => {
    expect(component.arr).toEqual(jasmine.any(Array));
  });

  
});
