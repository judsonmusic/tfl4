import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AAssessmentComponent } from './a-assessment.component';

describe('AAssessmentComponent', () => {
  let component: AAssessmentComponent;
  let fixture: ComponentFixture<AAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
