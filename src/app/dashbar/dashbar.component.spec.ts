import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbarComponent } from './dashbar.component';

describe('DashbarComponent', () => {
  let component: DashbarComponent;
  let fixture: ComponentFixture<DashbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbarComponent]
    });
    fixture = TestBed.createComponent(DashbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
