import {
  createEmptyTestSudoku,
  createSolutionForEmptyTestSudoku,
  createSolutionForSolvableTestSudoku,
  createSolvableTestSudoku,
  createUnsolvableTestSudoku,
} from '../test-utils';
import { expect, test } from 'vitest';
import { solveSudokuPuzzle } from '../../src/sudoku-solver/sudoku-solver';

test('Sudoku solver should solve a valid Sudoku puzzle correctly', () => {
  // given
  const sudoku = createSolvableTestSudoku();
  const correctSolution = createSolutionForSolvableTestSudoku();

  // when
  const result = solveSudokuPuzzle(sudoku);

  // then
  expect(result[0]).toBeTruthy();
  expect(result[1]).toEqual(correctSolution);
});

test('Sudoku solver should mark an unsolvable Sudoku puzzle as unsolvable', () => {
  // given
  const unsolvableSudoku = createUnsolvableTestSudoku();

  // when
  const result = solveSudokuPuzzle(unsolvableSudoku);

  // then
  expect(result[0]).toBeFalsy();
});

test('Sudoku solver should solve the empty Sudoku puzzle correctly', () => {
  // given
  const emptySudoku = createEmptyTestSudoku();
  const correctSolution = createSolutionForEmptyTestSudoku();

  // when
  const result = solveSudokuPuzzle(emptySudoku);

  // then
  expect(result[0]).toBeTruthy();
  expect(result[1]).toEqual(correctSolution);
});

test('Sudoku solver should return the input puzzle in case the input is already completed', () => {
  // given
  const sudoku = createSolutionForSolvableTestSudoku();
  const correctSolution = createSolutionForSolvableTestSudoku();
  expect(sudoku).toEqual(correctSolution); // assumption

  // when
  const result = solveSudokuPuzzle(sudoku);

  // then
  expect(result[0]).toBeTruthy();
  expect(result[1]).toEqual(correctSolution);
});
