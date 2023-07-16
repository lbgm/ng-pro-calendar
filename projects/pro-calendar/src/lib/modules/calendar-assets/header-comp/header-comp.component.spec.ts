import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCompComponent } from './header-comp.component';

describe('HeaderCompComponent', () => {
  let component: HeaderCompComponent;
  let fixture: ComponentFixture<HeaderCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCompComponent]
    });
    fixture = TestBed.createComponent(HeaderCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
