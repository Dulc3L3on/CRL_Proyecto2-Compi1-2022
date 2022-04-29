import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpaceComponent } from './report-space.component';

describe('ReportSpaceComponent', () => {
  let component: ReportSpaceComponent;
  let fixture: ComponentFixture<ReportSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
