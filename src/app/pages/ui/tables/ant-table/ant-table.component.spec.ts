import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAntTableComponent } from './ant-table.component';

describe('PageAntTableComponent', () => {
  let component: PageAntTableComponent;
  let fixture: ComponentFixture<PageAntTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAntTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAntTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
