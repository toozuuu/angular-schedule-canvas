import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCanvasComponent } from './schedule-canvas.component';

describe('ScheduleCanvasComponent', () => {
  let component: ScheduleCanvasComponent;
  let fixture: ComponentFixture<ScheduleCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleCanvasComponent]
    });
    fixture = TestBed.createComponent(ScheduleCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
