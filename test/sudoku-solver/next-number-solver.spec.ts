import { solveNextNumber } from '../../src/sudoku-solver/next-number-solver';

test('The next-number solver should return the correct next number', () => {
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
  const result = solveNextNumber(sudoku);
  expect(result.isSolvable).toEqual(true);
  expect(result.row).toEqual(6);
  expect(result.column).toEqual(3);
  expect(result.entry).toEqual(4);
});

test('The next-number solver should mark an unsolvable Sudoku puzzle as unsolvable', () => {
  const unsolvableSudoku: number[][] = [
    [-1, -1, -1, -1, -1, -1, 4, 8, 9],
    [-1, -1, -1, -1, -1, -1, 5, -1, 3],
    [-1, -1, -1, -1, 3, -1, 6, -1, 2],
    [-1, -1, -1, -1, -1, -1, 2, 7, 4],
    [-1, -1, -1, -1, -1, -1, 8, 9, 5],
    [-1, 2, -1, -1, -1, -1, 1, 3, 6],
    [-1, -1, -1, -1, -1, -1, -1, -1, 7],
    [-1, -1, -1, -1, -1, -1, -1, -1, 8],
    [-1, -1, -1, -1, -1, -1, -1, -1, 1],
  ];
  const result = solveNextNumber(unsolvableSudoku);
  expect(result.isSolvable).toEqual(false);
});

test('The next-number solver should calculate the first number for the empty Sudoku puzzle correctly', () => {
  const emptySudoku: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const result = solveNextNumber(emptySudoku);
  expect(result.isSolvable).toEqual(true);
  expect(result.row).toEqual(0);
  expect(result.column).toEqual(0);
  expect(result.entry).toEqual(1);
});

test('The next-number solver should return {true, -1, -1, -1} in case the input is already completed', () => {
  const sudoku: number[][] = [
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
  const result = solveNextNumber(sudoku);
  expect(result.isSolvable).toEqual(true);
  expect(result.row).toEqual(-1);
  expect(result.column).toEqual(-1);
  expect(result.entry).toEqual(-1);
});

test('Repeated calls to the next-number solver should eventually result in a correctly and completely solved Sudoku puzzle', () => {
  let sudoku: number[][] = [
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

  while (someEntriesLeft(sudoku)) {
    const nextEntry = solveNextNumber(sudoku);
    expect(nextEntry.isSolvable).toEqual(true);
    sudoku[nextEntry.row][nextEntry.column] = nextEntry.entry;
  }

  expect(sudoku).toEqual(correctSolution);
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
