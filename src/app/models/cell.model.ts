export interface Cell {
  row: number;
  col: number;
  state: 'empty' | 'obstacle' | 'visited' | 'path' | 'end';
}
