import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerFormatsExampleComponent } from './datepicker-formats-example.component';

describe('DatepickerFormatsExampleComponent', () => {
  let component: DatepickerFormatsExampleComponent;
  let fixture: ComponentFixture<DatepickerFormatsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerFormatsExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerFormatsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
