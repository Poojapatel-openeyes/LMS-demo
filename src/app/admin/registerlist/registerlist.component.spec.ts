import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterlistComponent } from './registerlist.component';

describe('RegisterlistComponent', () => {
  let component: RegisterlistComponent;
  let fixture: ComponentFixture<RegisterlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
