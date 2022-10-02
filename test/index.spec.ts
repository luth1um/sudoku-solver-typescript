import { nextNumber, solveSudoku } from '../src/index';
import { solveNextNumber } from '../src/sudoku-solver/next-number-solver';
import { cloneSudoku } from '../src/sudoku-solver/solver-utils';

test('The solver function in index.ts should call the internal solver and return the correct result (e2e test)', () => {
  const sudoku: number[][] = [
    [-1, -1, -1, -1, -1, 4, -1, 9],
    [8, -1, 2, 9, 7, -1, -1, -1, -1],
    [9, -1, 1, 2, -1, -1, 3, -1, -1],
    [-1, -1, -1, -1, 4, 9, 1, 5, 7],
    [-1, 1, 3, -1, 5, -1, 9, 2, -1],
    [5, 7, 9, 1, 2, -1, -1, -1, -1],
    [-1, -1, 7, -1, -1, 2, 6, -1, 3],
    [-1, -1, -1, -1, 3, 8, 2, -1, 5],
    [-1, 2, -1, 5, -1, -1, -1, -1, -1],
  ];
  const correctSolution: number[][] = [
    [7, 3, 5, 6, 1, 4, 8, 9, 2],
    [8, 4, 2, 9, 7, 3, 5, 6, 1],
    [9, 6, 1, 2, 8, 5, 3, 7, 4],
    [2, 8, 6, 3, 4, 9, 1, 5, 7],
    [4, 1, 3, 8, 5, 7, 9, 2, 6],
    [5, 7, 9, 1, 2, 6, 4, 3, 8],
    [1, 5, 7, 4, 9, 2, 6, 8, 3],
    [6, 9, 4, 7, 3, 8, 2, 1, 5],
    [3, 2, 8, 5, 6, 1, 7, 4, 9],
  ];
  const result = solveSudoku(sudoku);
  expect(result[0]).toEqual(true);
  expect(result[1]).toEqual(correctSolution);
});

test('The next-number solver in index.ts should call the internal solver and return the same result (e2e test)', () => {
  const sudoku: number[][] = [
    [-1, -1, -1, -1, -1, 4, -1, 9],
    [8, -1, 2, 9, 7, -1, -1, -1, -1],
    [9, -1, 1, 2, -1, -1, 3, -1, -1],
    [-1, -1, -1, -1, 4, 9, 1, 5, 7],
    [-1, 1, 3, -1, 5, -1, 9, 2, -1],
    [5, 7, 9, 1, 2, -1, -1, -1, -1],
    [-1, -1, 7, -1, -1, 2, 6, -1, 3],
    [-1, -1, -1, -1, 3, 8, 2, -1, 5],
    [-1, 2, -1, 5, -1, -1, -1, -1, -1],
  ];
  const resultIndex = nextNumber(sudoku);
  const resultInternal = solveNextNumber(sudoku);
  expect(resultIndex.isSolvable).toEqual(resultInternal.isSolvable);
  expect(resultIndex.row).toEqual(resultInternal.row);
  expect(resultIndex.column).toEqual(resultInternal.column);
  expect(resultIndex.entry).toEqual(resultInternal.entry);
});

test('Repeatedly calling the next-number solver should eventually give the same result as calling the Sudoku solver once (e2e test)', () => {
  const sudoku: number[][] = [
    [-1, -1, -1, -1, -1, 4, -1, 9],
    [8, -1, 2, 9, 7, -1, -1, -1, -1],
    [9, -1, 1, 2, -1, -1, 3, -1, -1],
    [-1, -1, -1, -1, 4, 9, 1, 5, 7],
    [-1, 1, 3, -1, 5, -1, 9, 2, -1],
    [5, 7, 9, 1, 2, -1, -1, -1, -1],
    [-1, -1, 7, -1, -1, 2, 6, -1, 3],
    [-1, -1, -1, -1, 3, 8, 2, -1, 5],
    [-1, 2, -1, 5, -1, -1, -1, -1, -1],
  ];
  const cloneNextNumber = cloneSudoku(sudoku);

  const resultSolveAtOnce = solveSudoku(sudoku);

  while (someEntriesLeft(cloneNextNumber)) {
    const nextEntry = solveNextNumber(cloneNextNumber);
    expect(nextEntry.isSolvable).toEqual(true);
    cloneNextNumber[nextEntry.row][nextEntry.column] = nextEntry.entry;
  }

  expect(resultSolveAtOnce[1]).toEqual(cloneNextNumber);
});

/**
 * Helper function to check whether there are unfilled entries in a Sudoku puzzle.
 * @param sudoku a 9x9 array representing a Sudoku puzzle
 * @returns true if, and only, if there is at least one unfilled entry in the specified sudoku puzzle
 */
function someEntriesLeft(sudoku: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === -1) {
        return true;
      }
    }
  }
  return false;
}
