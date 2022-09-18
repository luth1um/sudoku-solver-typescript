# 🤔 Sudoku Solver

A [Sudoku](https://en.wikipedia.org/wiki/Sudoku) solver written in TypeScript. To solve a Sudoku puzzle, simply call `solveSudoku(sudoku: number[][])`. The function applies optimized [backtracking](https://en.wikipedia.org/wiki/Backtracking) for solving puzzles. If you want to see the solver in action, you can visit [this website](https://luth1um.github.io/sudoku-solver-angular/).

The solver expects as argument a 9x9 `number` array where an entry is either an integer between `1` and `9` (in case the entry is given), or `-1` (in case the entry is unknown and needs to be calculated the solver).

As a result, the solver returns an array `[solvable: boolean, solution: number[][]]`. Here, `solvable` indicates whether the Sudoku puzzle is solvable or not, and `solution` is a valid solution for the Sudoku puzzle (if the puzzle is solvable).

# 🔍 Input Validation

Note, that the solver currently does not validate Sudoku puzzles. Instead, the solver expects the following properties for inputs:

- The input is a 9x9 `number[][]` where each entry is an integer between `1` and `9`, or `-1` (see above).
- Each row contains any value between `1` and `9` _at most_ once.
- Each column contains every value between `1` and `9` _at most_ once.
- Each 3x3 box contains every value between `1` and `9` _at most_ once.
