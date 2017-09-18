import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ADimensionsComponent } from './a-dimensions.component';

describe('ADimensionsComponent', () => {
  let component: ADimensionsComponent;
  let fixture: ComponentFixture<ADimensionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ADimensionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ADimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
