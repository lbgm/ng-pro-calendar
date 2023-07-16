import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderWidgetComponent } from './loader-widget.component';

describe('LoaderWidgetComponent', () => {
  let component: LoaderWidgetComponent;
  let fixture: ComponentFixture<LoaderWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderWidgetComponent]
    });
    fixture = TestBed.createComponent(LoaderWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
