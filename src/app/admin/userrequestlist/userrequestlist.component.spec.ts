import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrequestlistComponent } from './userrequestlist.component';

describe('UserrequestlistComponent', () => {
  let component: UserrequestlistComponent;
  let fixture: ComponentFixture<UserrequestlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrequestlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
