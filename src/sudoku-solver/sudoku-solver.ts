import { cloneSudoku, getPossibleEntries, isCorrectlySolved } from './solver-utils';

/**
 * Solves Sudoku puzzles. The first entry of the returned array is *false* if the Sudoku puzzle is not solvable.
 * @param sudoku Sudoku puzzle to solve
 * @returns solved Sudoku puzzle. The first entry of the returned array is *false* if the Sudoku puzzle is not solvable.
 */
export function solveSudokuPuzzle(sudoku: number[][]): [solvable: boolean, solution: number[][]] {
  let minNumberOfPossibleEntries = 10; // initially set to something greather than 9 such that one field is picked even in empty Sudoku
  let rowMinNumber = -1;
  let columnMinNumber = -1;
  let possibleEntriesMinNumber: number[] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // field already filled? continue with next field
      if (sudoku[i][j] >= 1) {
        continue;
      }

      // get possible entries for current field
      const possibleEntries: number[] = getPossibleEntries(sudoku, i, j);

      // no possible entries? Sudoku not solvable
      if (possibleEntries.length === 0) {
        return [false, sudoku];
      }

      // only one possibility left? add entry and start recursive call
      if (possibleEntries.length === 1) {
        const clone = cloneSudoku(sudoku);
        clone[i][j] = possibleEntries[0];
        return solveSudokuPuzzle(clone);
      }

      // multiple possible entries? find field with lowest number of possibilities
      if (possibleEntries.length < minNumberOfPossibleEntries) {
        minNumberOfPossibleEntries = possibleEntries.length;
        rowMinNumber = i;
        columnMinNumber = j;
        possibleEntriesMinNumber = possibleEntries;
      }
    }
  }
  // if arrived here: try out as many possibilities as needed for field with lowest number of possibilities
  const clone = cloneSudoku(sudoku);
  for (let i = 0; i < possibleEntriesMinNumber.length; i++) {
    clone[rowMinNumber][columnMinNumber] = possibleEntriesMinNumber[i];
    const result: [boolean, number[][]] = solveSudokuPuzzle(clone);
    if (!result[0]) {
      continue;
    }
    return result;
  }

  // if arrived here: solver is done
  return [isCorrectlySolved(clone), clone];
}
