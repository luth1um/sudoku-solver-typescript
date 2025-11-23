import { cloneSudoku, getPossibleEntries, isCorrectlySolved } from './solver-utils';
import { NextNumberResult } from '../index';

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
export function solveNextNumber(sudoku: number[][]): NextNumberResult {
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
        return { isSolvable: false, row: i, column: j, entry: -1 };
      }

      // only one possibility left? add entry and start recursive call
      // NOTE: recursive call is needed as we still want to check whether the puzzle is completely solvable
      if (possibleEntries.length === 1) {
        const clone = cloneSudoku(sudoku);
        clone[i][j] = possibleEntries[0];
        return { isSolvable: solveNextNumber(clone).isSolvable, row: i, column: j, entry: possibleEntries[0] };
      }

      // multiple possible entries? find field with the lowest number of possibilities
      if (possibleEntries.length < minNumberOfPossibleEntries) {
        minNumberOfPossibleEntries = possibleEntries.length;
        rowMinNumber = i;
        columnMinNumber = j;
        possibleEntriesMinNumber = possibleEntries;
      }
    }
  }
  // if arrived here: try out as many possibilities as needed for field with the lowest number of possibilities
  const clone = cloneSudoku(sudoku);
  for (const possibleEntry of possibleEntriesMinNumber) {
    clone[rowMinNumber][columnMinNumber] = possibleEntry;
    const result: NextNumberResult = solveNextNumber(clone);
    if (!result.isSolvable) {
      continue;
    }
    return {
      isSolvable: result.isSolvable,
      row: rowMinNumber,
      column: columnMinNumber,
      entry: possibleEntry,
    };
  }

  // if arrived here: solver is done
  return { isSolvable: isCorrectlySolved(clone), row: -1, column: -1, entry: -1 };
}
