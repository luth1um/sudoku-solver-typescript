/**
 * Finds possible entries for a specific field in a Sudoku puzzle.
 * @param sudoku the Sudoku puzzle to check
 * @param row row of the field to check
 * @param column column of the field to check
 * @returns possible entries which are not yet in conflict with any other field
 */
export function getPossibleEntries(sudoku: number[][], row: number, column: number): number[] {
  // check inputs
  if (row < 0 || row > 8) {
    throw 'row ' + row + ' not existing';
  }
  if (column < 0 || column > 8) {
    throw 'column ' + column + ' not existing';
  }

  // return entry if the field already has a number
  const entry = sudoku[row][column];
  if (entry >= 1 && entry <= 9) {
    return [entry];
  }

  // find possible entries
  const possibleEntries: number[] = [];
  outer: for (let entryNumber = 1; entryNumber <= 9; entryNumber++) {
    // check row
    for (let i = 0; i < 9; i++) {
      if (sudoku[row][i] === entryNumber) {
        continue outer;
      }
    }
    // check column
    for (let i = 0; i < 9; i++) {
      if (sudoku[i][column] === entryNumber) {
        continue outer;
      }
    }
    // check box of field
    const leftmostCoordOfBox = Math.trunc(column / 3) * 3;
    const topmostCoordOfBox = Math.trunc(row / 3) * 3;
    for (let i = topmostCoordOfBox; i < topmostCoordOfBox + 3; i++) {
      for (let j = leftmostCoordOfBox; j < leftmostCoordOfBox + 3; j++) {
        if (sudoku[i][j] === entryNumber) {
          continue outer;
        }
      }
    }

    // if arrived here: entryNumber is not yet used in any conflicting field
    possibleEntries.push(entryNumber);
  }
  return possibleEntries;
}

/**
 * Generates a new Sudoku puzzle with the exact same entries.
 * @param sudoku Sudoku puzzle to clone
 * @returns clone of the Sudoku puzzle
 */
export function cloneSudoku(sudoku: number[][]): number[][] {
  const clone: number[][] = [];
  for (let i = 0; i < 9; i++) {
    const row: number[] = [];
    for (let j = 0; j < 9; j++) {
      row.push(sudoku[i][j]);
    }
    clone.push(row);
  }
  return clone;
}

/**
 * Checks whether a Sudoku puzzle is completely solved. In particular, this functions checks that every number is used exactly once in every row, column, and box.
 * @param sudoku the Sudoku puzzle to check
 * @returns true if, and only if, the Sudoku puzzle is completely and correctly solved
 */
export function isCorrectlySolved(sudoku: number[][]): boolean {
  return allRowsValid(sudoku) && allColumnsValid(sudoku) && allBoxesValid(sudoku);
}

/**
 * Checks for each row of the Sudoku puzzle whether every number is used exactly once.
 * @param sudoku the Sudoku puzzle to check
 * @returns true, if and only if, every number is used exactly once in every row
 */
export function allRowsValid(sudoku: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    const numbersUsed: boolean[] = [false, false, false, false, false, false, false, false, false];
    for (let j = 0; j < 9; j++) {
      const entry: number = sudoku[i][j];
      if (entry < 1) {
        return false;
      }
      numbersUsed[entry - 1] = true;
    }
    // check if every number was used exactly once
    for (let index = 0; index < numbersUsed.length; index++) {
      if (!numbersUsed[index]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks for each column of the Sudoku puzzle whether every number is used exactly once.
 * @param sudoku the Sudoku puzzle to check
 * @returns true, if and only if, every number is used exactly once in every column
 */
export function allColumnsValid(sudoku: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    const numbersUsed: boolean[] = [false, false, false, false, false, false, false, false, false];
    for (let j = 0; j < 9; j++) {
      const entry: number = sudoku[j][i]; // [j][i] instead of [i][j] to check columns instead of rows
      if (entry < 1) {
        return false;
      }
      numbersUsed[entry - 1] = true;
    }
    // check if every number was used exactly once
    for (let index = 0; index < numbersUsed.length; index++) {
      if (!numbersUsed[index]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks for each box of the Sudoku puzzle whether every number is used exactly once.
 * @param sudoku the Sudoku puzzle to check
 * @returns true, if and only if, every number is used exactly once in every box
 */
export function allBoxesValid(sudoku: number[][]): boolean {
  for (let box = 0; box < 9; box++) {
    // go through boxes: box = 5 means that 6th box is checked (counted row-wise)
    const numbersUsed: boolean[] = [false, false, false, false, false, false, false, false, false];
    for (let boxEntry = 0; boxEntry < 9; boxEntry++) {
      // go through box entries: boxEntry = 7 means 8th entry of the box (counted row-wise)
      const entry: number =
        sudoku[getFirstRowOfBox(box) + Math.trunc(boxEntry / 3)][getFirstColumnOfBox(box) + (boxEntry % 3)];
      numbersUsed[entry - 1] = true;
    }
    // check if every number was used exactly once
    for (let index = 0; index < numbersUsed.length; index++) {
      if (!numbersUsed[index]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Calculates the first row of a box in a Sudoku puzzle. The boxes are counted row-wise.
 * @param boxNumber number of the box in the Sudoku puzzle (counted row-wise)
 * @returns first row of the box
 */
export function getFirstRowOfBox(boxNumber: number): number {
  // check inputs
  if (boxNumber < 0 || boxNumber > 8) {
    throw 'boxNumber ' + boxNumber + ' not existing';
  }

  // return result
  if (boxNumber < 3) {
    return 0;
  }
  if (boxNumber < 6) {
    return 3;
  }
  return 6;
}

/**
 * Calculates the first column of a box in a Sudoku puzzle. The boxes are counted row-wise.
 * @param boxNumber number of the box in the Sudoku puzzle (counted row-wise)
 * @returns first column of the box
 */
export function getFirstColumnOfBox(boxNumber: number): number {
  // check inputs
  if (boxNumber < 0 || boxNumber > 8) {
    throw 'boxNumber ' + boxNumber + ' not existing';
  }

  // return result
  if (boxNumber === 0 || boxNumber === 3 || boxNumber === 6) {
    return 0;
  }
  if (boxNumber === 1 || boxNumber === 4 || boxNumber === 7) {
    return 3;
  }
  return 6;
}
