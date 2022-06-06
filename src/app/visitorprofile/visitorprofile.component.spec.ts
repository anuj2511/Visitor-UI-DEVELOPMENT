import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorprofileComponent } from './visitorprofile.component';

describe('VisitorprofileComponent', () => {
  let component: VisitorprofileComponent;
  let fixture: ComponentFixture<VisitorprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
