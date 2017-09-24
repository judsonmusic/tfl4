import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AStressComponent } from './a-stress.component';

describe('AStressComponent', () => {
  let component: AStressComponent;
  let fixture: ComponentFixture<AStressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AStressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AStressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
