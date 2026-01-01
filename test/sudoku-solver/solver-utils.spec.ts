import {
  allBoxesValid,
  allColumnsValid,
  allRowsValid,
  cloneSudoku,
  getFirstColumnOfBox,
  getFirstRowOfBox,
  getPossibleEntries,
  isCorrectlySolved,
} from '../../src/sudoku-solver/solver-utils';
import { expect, test } from 'vitest';
import { createSolutionForSolvableTestSudoku, createSolvableTestSudoku } from '../test-utils';

test('getPossibleEntries() should return the correct entries', () => {
  // given
  const sudoku = createSolvableTestSudoku();
  const correctEntries: number[] = [2, 6];

  // when
  const result: number[] = getPossibleEntries(sudoku, 3, 0);

  // then
  expect(result).toEqual(correctEntries);
});

test('getPossibleEntries() should throw in case of an invalid row or column', () => {
  // given
  const sudoku = createSolvableTestSudoku();

  // when / then
  expect(() => getPossibleEntries(sudoku, -1, 0)).toThrow('row -1 not existing');
  expect(() => getPossibleEntries(sudoku, 9, 0)).toThrow('row 9 not existing');
  expect(() => getPossibleEntries(sudoku, 6, -1)).toThrow('column -1 not existing');
  expect(() => getPossibleEntries(sudoku, 6, 9)).toThrow('column 9 not existing');
});

test('getPossibleEntries() should return the existing entry if there is already an entry', () => {
  // given
  const sudoku = createSolvableTestSudoku();
  const correctEntries: number[] = [9];

  // when
  const result: number[] = getPossibleEntries(sudoku, 4, 6);

  // then
  expect(result).toEqual(correctEntries);
});

test('cloneSudoku() should return a correct clone', () => {
  // given
  const sudoku = createSolvableTestSudoku();

  // when
  const clone: number[][] = cloneSudoku(sudoku);

  // then
  expect(sudoku).toEqual(clone);
});

test('isCorrectlySolved() should mark a correctly solved Sudoku puzzle as correctly solved', () => {
  // given
  const solvedSudoku = createSolutionForSolvableTestSudoku();

  // when
  const result: boolean = isCorrectlySolved(solvedSudoku);

  // then
  expect(result).toBe(true);
});

test('isCorrectlySolved() should mark an incomplete Sudoku puzzle as not correctly solved', () => {
  // given
  const incompleteSudoku: number[][] = [
    [7, 3, 5, 6, 1, 4, 8, 9, 2],
    [8, 4, 2, 9, 7, 3, 5, 6, 1],
    [9, 6, -1, 2, 8, 5, 3, 7, 4],
    [2, 8, 6, 3, 4, 9, 1, 5, 7],
    [4, 1, 3, 8, 5, 7, 9, 2, 6],
    [5, 7, 9, 1, 2, 6, 4, 3, 8],
    [1, 5, 7, 4, 9, 2, 6, 8, 3],
    [6, 9, 4, 7, 3, 8, 2, 1, 5],
    [3, 2, 8, 5, 6, 1, 7, 4, 9],
  ];

  // when
  const result: boolean = isCorrectlySolved(incompleteSudoku);

  // then
  expect(result).toBe(false);
});

test('isCorrectlySolved() should mark an incorrect solution as not correctly solved', () => {
  // given
  const solvedSudoku: number[][] = [
    [7, 3, 5, 6, 1, 4, 8, 9, 2],
    [8, 4, 2, 9, 7, 3, 5, 6, 1],
    [9, 6, 1, 2, 8, 5, 3, 7, 4],
    [2, 8, 6, 3, 4, 9, 1, 5, 7],
    [4, 1, 3, 8, 5, 7, 1, 2, 6],
    [5, 7, 9, 1, 2, 6, 4, 3, 8],
    [1, 5, 7, 4, 9, 2, 6, 8, 3],
    [6, 9, 4, 7, 3, 8, 2, 1, 5],
    [3, 2, 8, 5, 6, 1, 7, 4, 9],
  ];

  // when
  const result: boolean = isCorrectlySolved(solvedSudoku);

  // then
  expect(result).toBe(false);
});

test('allRowsValid() should return true if all rows are valid', () => {
  // given
  const solvedSudoku = createSolutionForSolvableTestSudoku();

  // when
  const result: boolean = allRowsValid(solvedSudoku);

  // then
  expect(result).toBe(true);
});

test('allRowsValid() should return false if some rows are invalid', () => {
  // given
  const solvedSudoku: number[][] = [
    [7, 3, 5, 6, 1, 4, 8, 9, 2],
    [8, 4, 2, 9, 7, 3, 5, 6, 1],
    [9, 6, 1, 2, 8, 5, 3, 7, 4],
    [2, 2, 6, 3, 4, 9, 1, 5, 7],
    [4, 1, 3, 8, 5, 7, 9, 2, 6],
    [5, 7, 9, 1, 2, 6, 4, 3, 8],
    [1, 5, 7, 4, 9, 2, 6, 8, 3],
    [6, 9, 4, 7, 3, 8, 2, 1, 5],
    [3, 8, 8, 5, 6, 1, 7, 4, 9],
  ];

  // when
  const result: boolean = allRowsValid(solvedSudoku);

  // then
  expect(result).toBe(false);
});

test('allColumnsValid() should return true if all columns are valid', () => {
  // given
  const solvedSudoku = createSolutionForSolvableTestSudoku();

  // when
  const result: boolean = allColumnsValid(solvedSudoku);

  // then
  expect(result).toBe(true);
});

test('allColumnsValid() should return false if some columns are invalid', () => {
  // given
  const solvedSudoku: number[][] = [
    [7, 3, 5, 6, 1, 4, 8, 9, 2],
    [8, 4, 2, 9, 7, 3, 5, 6, 1],
    [1, 6, 9, 2, 8, 5, 3, 7, 4],
    [2, 2, 6, 3, 4, 9, 1, 5, 7],
    [4, 1, 3, 8, 5, 7, 9, 2, 6],
    [5, 7, 9, 1, 2, 6, 4, 3, 8],
    [1, 5, 7, 4, 9, 2, 6, 8, 3],
    [6, 9, 4, 7, 3, 8, 2, 1, 5],
    [3, 8, 8, 5, 6, 1, 7, 4, 9],
  ];

  // when
  const result: boolean = allColumnsValid(solvedSudoku);

  // then
  expect(result).toBe(false);
});

test('allBoxesValid() should return true if all boxes are valid', () => {
  // given
  const solvedSudoku = createSolutionForSolvableTestSudoku();

  // when
  const result: boolean = allBoxesValid(solvedSudoku);

  // then
  expect(result).toBe(true);
});

test('allBoxesValid() should return false if some boxes are invalid', () => {
  // given
  const solvedSudoku: number[][] = [
    [7, 3, 6, 5, 1, 4, 8, 9, 2],
    [8, 4, 2, 9, 7, 3, 5, 6, 1],
    [9, 6, 1, 2, 8, 5, 3, 7, 4],
    [2, 8, 6, 3, 4, 9, 1, 5, 7],
    [4, 1, 3, 8, 5, 7, 9, 2, 6],
    [5, 7, 9, 1, 2, 6, 4, 3, 8],
    [1, 5, 7, 4, 9, 2, 6, 8, 3],
    [6, 9, 4, 7, 3, 8, 2, 1, 5],
    [3, 2, 8, 5, 6, 1, 7, 4, 9],
  ];

  // when
  const result: boolean = allBoxesValid(solvedSudoku);

  // then
  expect(result).toBe(false);
});

test('getFirstRowOfBox() should return the correct first row of a box', () => {
  // when / then
  expect(getFirstRowOfBox(0)).toBe(0);
  expect(getFirstRowOfBox(1)).toBe(0);
  expect(getFirstRowOfBox(2)).toBe(0);
  expect(getFirstRowOfBox(3)).toBe(3);
  expect(getFirstRowOfBox(4)).toBe(3);
  expect(getFirstRowOfBox(5)).toBe(3);
  expect(getFirstRowOfBox(6)).toBe(6);
  expect(getFirstRowOfBox(7)).toBe(6);
  expect(getFirstRowOfBox(8)).toBe(6);
});

test('getFirstRowOfBox() should throw in case of an invalid row number', () => {
  // when / then
  expect(() => getFirstRowOfBox(-1)).toThrow('boxNumber -1 not existing');
  expect(() => getFirstRowOfBox(-17)).toThrow('boxNumber -17 not existing');
  expect(() => getFirstRowOfBox(9)).toThrow('boxNumber 9 not existing');
  expect(() => getFirstRowOfBox(42)).toThrow('boxNumber 42 not existing');
});

test('getFirstColumnOfBox() should return the correct first column of a box', () => {
  // when / then
  expect(getFirstColumnOfBox(0)).toBe(0);
  expect(getFirstColumnOfBox(1)).toBe(3);
  expect(getFirstColumnOfBox(2)).toBe(6);
  expect(getFirstColumnOfBox(3)).toBe(0);
  expect(getFirstColumnOfBox(4)).toBe(3);
  expect(getFirstColumnOfBox(5)).toBe(6);
  expect(getFirstColumnOfBox(6)).toBe(0);
  expect(getFirstColumnOfBox(7)).toBe(3);
  expect(getFirstColumnOfBox(8)).toBe(6);
});

test('getFirstColumnOfBox() should throw in case of an invalid column number', () => {
  // when / then
  expect(() => getFirstColumnOfBox(-1)).toThrow('boxNumber -1 not existing');
  expect(() => getFirstColumnOfBox(-17)).toThrow('boxNumber -17 not existing');
  expect(() => getFirstColumnOfBox(9)).toThrow('boxNumber 9 not existing');
  expect(() => getFirstColumnOfBox(42)).toThrow('boxNumber 42 not existing');
});
