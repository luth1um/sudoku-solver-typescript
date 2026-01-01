import { expect, test } from 'vitest';
import { solveNextNumber } from '../../src/sudoku-solver/next-number-solver';
import {
  createEmptyTestSudoku,
  createSolutionForSolvableTestSudoku,
  createSolvableTestSudoku,
  createUnsolvableTestSudoku,
} from '../test-utils';

test('The next-number solver should return the correct next number', () => {
  // given
  const sudoku = createSolvableTestSudoku();

  // when
  const result = solveNextNumber(sudoku);

  // then
  expect(result.isSolvable).toBe(true);
  expect(result.row).toBe(6);
  expect(result.column).toBe(3);
  expect(result.entry).toBe(4);
});

test('The next-number solver should mark an unsolvable Sudoku puzzle as unsolvable', () => {
  // given
  const unsolvableSudoku = createUnsolvableTestSudoku();

  // when
  const result = solveNextNumber(unsolvableSudoku);

  // then
  expect(result.isSolvable).toBe(false);
});

test('The next-number solver should calculate the first number for the empty Sudoku puzzle correctly', () => {
  // given
  const emptySudoku = createEmptyTestSudoku();

  // when
  const result = solveNextNumber(emptySudoku);

  // then
  expect(result.isSolvable).toBe(true);
  expect(result.row).toBe(0);
  expect(result.column).toBe(0);
  expect(result.entry).toBe(1);
});

test('The next-number solver should return {true, -1, -1, -1} in case the input is already completed', () => {
  // given
  const sudoku = createSolutionForSolvableTestSudoku();

  // when
  const result = solveNextNumber(sudoku);

  // then
  expect(result.isSolvable).toBe(true);
  expect(result.row).toBe(-1);
  expect(result.column).toBe(-1);
  expect(result.entry).toBe(-1);
});

test('Repeated calls to the next-number solver should eventually result in a correctly and completely solved Sudoku puzzle', () => {
  // given
  const sudoku = createSolvableTestSudoku();
  const correctSolution = createSolutionForSolvableTestSudoku();

  // when / then
  while (someEntriesLeft(sudoku)) {
    const nextEntry = solveNextNumber(sudoku);
    expect(nextEntry.isSolvable).toBe(true);
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
