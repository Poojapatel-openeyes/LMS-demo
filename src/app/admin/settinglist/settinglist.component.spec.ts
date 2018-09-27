import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettinglistComponent } from './settinglist.component';

describe('SettinglistComponent', () => {
  let component: SettinglistComponent;
  let fixture: ComponentFixture<SettinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
