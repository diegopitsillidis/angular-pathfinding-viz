import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfindingVizComponent } from './pathfinding-viz.component';

describe('PathfindingVizComponent', () => {
  let component: PathfindingVizComponent;
  let fixture: ComponentFixture<PathfindingVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathfindingVizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathfindingVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
