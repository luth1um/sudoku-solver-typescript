import { solveSudokuPuzzle } from './sudoku-solver';

/**
 * Solves Sudoku puzzles. The first entry of the returned array is *false* if the Sudoku puzzle is not solvable.
 * @param sudoku Sudoku puzzle to solve
 * @returns solved Sudoku puzzle. The first entry of the returned array is *false* if the Sudoku puzzle is not solvable.
 */
export function solveSudoku(sudoku: number[][]): [solvable: boolean, solution: number[][]] {
  return solveSudokuPuzzle(sudoku);
}
