import { Component, OnInit } from '@angular/core';
import { PathfindingService } from '../services/pathfinding.service';
import { Cell } from '../models/cell.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pathfinding-viz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pathfinding-viz.component.html',
  styleUrls: ['./pathfinding-viz.component.css']
})
export class PathfindingVizComponent implements OnInit {
  grid: Cell[][] = [];
  rows: number = 10;
  cols: number = 10;
  isRunning: boolean = false;
  end: Cell | undefined;

  constructor(private pathfindingService: PathfindingService) {}

  ngOnInit(): void {
    this.initializeGrid();
  }

  private initializeGrid(): void {
    this.grid = Array.from({ length: this.rows }, (_, row) =>
      Array.from({ length: this.cols }, (_, col): Cell => ({
        row,
        col,
        state: 'empty'
      }))
    );

    this.end = (this.end === undefined) ? this.grid[this.rows - 1][this.cols - 1]: this.end;
  }

  public startAlgorithm(): void {
    // Define start and end cells (for simplicity: top-left and bottom-right)
    const start: Cell = this.grid[0][0];
    if(this.end === undefined) {
      const lastCell = this.grid[this.rows - 1][this.cols - 1];
      this.setEndCell(lastCell)
    }
    this.isRunning = true;
    this.pathfindingService.runBFS(this.grid, start, this.end!).subscribe({
      next: (updatedGrid: Cell[][]) => {
        this.grid = updatedGrid;
      },
      complete: () => {
        this.isRunning = false;
      }
    });
  }

  public reset(): void {
    this.isRunning = false;
    this.initializeGrid();
  }

  public setEndCell(cell: Cell): Cell {
    this.grid.forEach(row => {
      row.forEach(cell => {
        cell.state = 'empty';
      });
    })
    cell.state = 'end'
    this.end = cell;
    return cell;
  }
}
