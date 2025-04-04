import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cell } from '../models/cell.model';

@Injectable({
  providedIn: 'root'
})
export class PathfindingService {
  /**
   * Runs a BFS on the grid from the start cell to the end cell.
   * It emits an updated grid state at each step (every 250ms).
   */
  runBFS(initialGrid: Cell[][], start: Cell, end: Cell): Observable<Cell[][]> {
    return new Observable<Cell[][]>(subscriber => {
      // Clone the grid so we don't mutate the original.
      let grid = initialGrid.map(row => row.map(cell => ({ ...cell })));

      // Initialize the BFS queue and mark the start as visited.
      const queue: Cell[] = [];
      queue.push(grid[start.row][start.col]);
      grid[start.row][start.col].state = 'visited';

      // Emit the initial state.
      subscriber.next(grid);

      // Define directions for neighbors: up, down, left, right.
      const directions = [
        { dr: -1, dc: 0 },
        { dr: 1, dc: 0 },
        { dr: 0, dc: -1 },
        { dr: 0, dc: 1 }
      ];

      // Function to process one BFS step.
      const processNext = () => {
        if (queue.length === 0) {
          // No more cells to process.
          subscriber.complete();
          return;
        }
        const current = queue.shift();
        if (!current) return;

        // If we reached the end cell, emit and complete.

        console.log(grid[end.row][end.col].state);
        if (grid[end.row][end.col].state === 'visited') {
          subscriber.next(grid);
          subscriber.complete();
          return;
        }

        // Process all valid neighbors.
        for (const d of directions) {
          const newRow = current.row + d.dr;
          const newCol = current.col + d.dc;
          if (
            newRow >= 0 &&
            newRow < grid.length &&
            newCol >= 0 &&
            newCol < grid[0].length
          ) {
            const neighbor = grid[newRow][newCol];
            if (neighbor.state === 'empty' || neighbor.state === 'end') {
              neighbor.state = 'visited';
              queue.push(neighbor);
            }
          }
        }
        // Emit the updated grid state after processing one cell.
        subscriber.next(grid);
      };

      // Process one BFS step every 250ms.
      const intervalId = setInterval(() => {
        processNext();
      }, 250);

      // Cleanup when unsubscribed.
      return () => {
        clearInterval(intervalId);
      };
    });
  }
}
