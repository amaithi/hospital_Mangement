import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedoctorComponent } from './managedoctor.component';

describe('ManagedoctorComponent', () => {
  let component: ManagedoctorComponent;
  let fixture: ComponentFixture<ManagedoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
