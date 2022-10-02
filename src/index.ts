import { solveNextNumber } from './sudoku-solver/next-number-solver';
import { solveSudokuPuzzle } from './sudoku-solver/sudoku-solver';

/**
 * Solves Sudoku puzzles. The first entry of the returned array is *false* if the Sudoku puzzle is not solvable.
 * @param sudoku Sudoku puzzle to solve
 * @returns solved Sudoku puzzle. The first entry of the returned array is *false* if the Sudoku puzzle is not solvable.
 */
export function solveSudoku(sudoku: number[][]): [solvable: boolean, solution: number[][]] {
  return solveSudokuPuzzle(sudoku);
}

/**
 * Calculates the next number for the specified Sudoku puzzle.
 * The function returns whether the puzzle *isSolvable*, and it returns the *row*, the *column*, and the *entry* itself for the next number.
 *
 * In particular, the function returns the entry for the field with the fewest number of possible entries.
 * For instance, if there is a field with 7 possible entries and another field with only 2 possible entries, a correct entry for the latter is returned.
 *
 * **NOTE:** If the Sudoku puzzle is already completely solved, this function returns value -1 for *row*, *column*, and *entry*.
 * @param sudoku the Sudoku puzzle for which the next entry should be calculated
 * @returns the entry for the next field
 */
export function nextNumber(sudoku: number[][]): NextNumberResult {
  return solveNextNumber(sudoku);
}

export interface NextNumberResult {
  isSolvable: boolean;
  row: number;
  column: number;
  entry: number;
}
