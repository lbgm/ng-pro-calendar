import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideEventComponent } from './side-event.component';

describe('SideEventComponent', () => {
  let component: SideEventComponent;
  let fixture: ComponentFixture<SideEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideEventComponent]
    });
    fixture = TestBed.createComponent(SideEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
