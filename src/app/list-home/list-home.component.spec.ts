import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHomeComponent } from './list-home.component';

describe('ListHomeComponent', () => {
  let component: ListHomeComponent;
  let fixture: ComponentFixture<ListHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHomeComponent]
    });
    fixture = TestBed.createComponent(ListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
