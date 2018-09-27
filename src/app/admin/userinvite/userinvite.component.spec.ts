import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinviteComponent } from './userinvite.component';

describe('UserinviteComponent', () => {
  let component: UserinviteComponent;
  let fixture: ComponentFixture<UserinviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
