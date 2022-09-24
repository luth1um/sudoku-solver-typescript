import { solveSudoku } from '../src/index';

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
