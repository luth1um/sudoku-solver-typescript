import { createSolutionForSolvableTestSudoku, createSolvableTestSudoku } from './test-utils';
import { expect, test } from 'vitest';
import { nextNumber, solveSudoku } from '../src';
import { cloneSudoku } from '../src/sudoku-solver/solver-utils';
import { solveNextNumber } from '../src/sudoku-solver/next-number-solver';

test('The solver function in index.ts should call the internal solver and return the correct result (e2e test)', () => {
  // given
  const sudoku = createSolvableTestSudoku();
  const correctSolution = createSolutionForSolvableTestSudoku();

  // when
  const result = solveSudoku(sudoku);

  // then
  expect(result[0]).toBeTruthy();
  expect(result[1]).toEqual(correctSolution);
});

test('The next-number solver in index.ts should call the internal solver and return the same result (e2e test)', () => {
  // given
  const sudoku = createSolvableTestSudoku();

  // when
  const resultIndex = nextNumber(sudoku);
  const resultInternal = solveNextNumber(sudoku);

  // then
  expect(resultIndex.isSolvable).toBe(resultInternal.isSolvable);
  expect(resultIndex.row).toBe(resultInternal.row);
  expect(resultIndex.column).toBe(resultInternal.column);
  expect(resultIndex.entry).toBe(resultInternal.entry);
});

test('Repeatedly calling the next-number solver should eventually give the same result as calling the Sudoku solver once (e2e test)', () => {
  // given
  const sudoku = createSolvableTestSudoku();
  const cloneNextNumber = cloneSudoku(sudoku);

  // when / then
  const resultSolveAtOnce = solveSudoku(sudoku);

  while (someEntriesLeft(cloneNextNumber)) {
    const nextEntry = solveNextNumber(cloneNextNumber);
    expect(nextEntry.isSolvable).toBeTruthy();
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
