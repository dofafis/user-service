import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateSuccessComponent } from './user-create-success.component';

describe('UserCreateSuccessComponent', () => {
  let component: UserCreateSuccessComponent;
  let fixture: ComponentFixture<UserCreateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
