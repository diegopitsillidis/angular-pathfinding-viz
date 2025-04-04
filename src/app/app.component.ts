import { Component } from '@angular/core';
import { PathfindingVizComponent } from './pathfinding-viz/pathfinding-viz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PathfindingVizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-pathfinding-viz';
}
