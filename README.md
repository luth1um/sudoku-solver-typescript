[![CI pipeline](https://github.com/luth1um/sudoku-solver-typescript/actions/workflows/pipeline.yml/badge.svg)](https://github.com/luth1um/sudoku-solver-typescript/actions/workflows/pipeline.yml)

# 🤔 Sudoku Solver

A [Sudoku](https://en.wikipedia.org/wiki/Sudoku) solver written in TypeScript. The solver applies optimized [backtracking](https://en.wikipedia.org/wiki/Backtracking) for solving puzzles. If you want to see the solver in action, you can visit [this website](https://luth1um.github.io/sudoku-solver-angular/).

The solver expects as argument a 9x9 `number` array where an entry is either an integer between `1` and `9` (in case the entry is known), or `-1` (in case the entry is unknown and needs to be calculated by the solver).

# 🚀 Functions

Currently, the solver provides the following functions:

- `solveSudoku(sudoku: number[][])`: Solves a Sudoku puzzle. The function returns an array `[solvable: boolean, solution: number[][]]`. Here, `solvable` indicates whether the Sudoku puzzle is solvable or not, and `solution` is a valid solution for the Sudoku puzzle (if the puzzle is solvable).
- `nextNumber(sudoku: number[][])`: Calculates the next number for a Sudoku puzzle. The function returns whether the puzzle _isSolvable_, and it returns the _row_, the _column_, and the _entry_ itself for the next number. In particular, the function returns the entry for the field with the fewest number of possible entries. For instance, if there is a field with 7 possible entries and another field with only 2 possible entries, a correct entry for the latter is returned. **NOTE:** If the Sudoku puzzle is already completely solved, this function returns value _-1_ for _row_, _column_, and _entry_.

# 🔍 Input Validation

Note, that the solver currently does not validate Sudoku puzzles. Instead, the solver expects the following properties for inputs:

- The input is a 9x9 `number[][]` array where each entry is an integer between `1` and `9`, or `-1` (see above).
- Each row contains every value between `1` and `9` **at most** once.
- Each column contains every value between `1` and `9` **at most** once.
- Each 3x3 box contains every value between `1` and `9` **at most** once.

# 🔗 Links

- Sudoku solver on [GitHub](https://github.com/luth1um/sudoku-solver-typescript)
- Sudoku solver package on [npm](https://www.npmjs.com/package/fast-sudoku-solver)
