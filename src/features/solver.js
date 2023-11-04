export function validateBoard(board){
    const validators = [
        validateSquares,
        validateRows,
        validateColumns
    ];
    for(let validator of validators){
        if(!validator(board)){
            return false;
        }
    }
    return true;
}

export function validateSquares(board){
    for(let square = 0; square < 9; ++square){
        const squareBegin = (square%3)*3;
        const squareEnd = squareBegin + 3;
        const values = new Set();
        for(let x = squareBegin; x < squareEnd; ++x){
            for(let y = parseInt(square/3)*3; y < parseInt(square/3)*3+3; ++y){
                const value = board[y][x];
                if(value === "") continue;
                if(values.has(value)) return false;
                else values.add(value);
            }
        }
    }
    return true;
}

export function validateRows(board){
    for(let row = 0; row < 9; ++row){
        const values = new Set();
        for(let col = 0; col < 9; ++col){
            const value = board[row][col];
            if(value === "") continue;
            if(values.has(value)) return false;
            else values.add(value);
        }
    }
    return true;
}

export function validateColumns(board){
    for(let col = 0; col < 9; ++col){
        const values = new Set();
        for(let row = 0; row < 9; ++row){
            const value = board[row][col];
            if(value === "") continue;
            if(values.has(value)) return false;
            else values.add(value);
        }
    }
    return true;
}

let possibleValuesBoard = null;
export function solveBoard(board, lastRow = 0, lastCol = 0){
    if(possibleValuesBoard === null) possibleValuesBoard = Array(9).fill(null).map(() => Array(9).fill(null).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])));
    const rollback = reduceBoard(board, possibleValuesBoard);
    const reducedBoard = board;
    if(!validateBoard(reducedBoard)){
        rollback(board);
        possibleValuesBoard = Array(9).fill(null).map(() => Array(9).fill(null).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])));
        return null;
    }
    for(let row = lastRow; row < 9; ++row){
        for(let col = (row === lastRow ? lastCol : 0); col < 9; ++col){
            if(reducedBoard[row][col] === ""){
                const values = Array.from(possibleValuesBoard[row][col]);
                values.sort(() => Math.random() - 0.5);
                for(let value of values){
                    reducedBoard[row][col] = value;
                    const solution = solveBoard(reducedBoard, row, col);
                    if(solution !== null) return solution;
                    reducedBoard[row][col] = "";
                }
                if(lastRow === 0 && lastCol === 0){
                    possibleValuesBoard = null;
                }
                rollback(board);
                possibleValuesBoard = Array(9).fill(null).map(() => Array(9).fill(null).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])));
                return null;
            }
        }
    }
    possibleValuesBoard = null;
    return reducedBoard;
}

export function copyBoard(board){
    return board.map(row => row.slice());
}

export function equals(board1, board2){
    for(let row = 0; row < 9; ++row){
        for(let col = 0; col < 9; ++col){
            if(board1[row][col] !== board2[row][col]) return false;
        }
    }
    return true;
}

export function hasEmptyCells(board){
    for(let row = 0; row < 9; ++row){
        for(let col = 0; col < 9; ++col){
            if(board[row][col] === "") return true;
        }
    }
    return false;
}

export function reduceBoard(board, possibleValues){
    const reducers = [
        reduceByRows,
        reduceByColumns,
        reduceBySquares
    ];
    let hasChanged = false
    do{
        hasChanged = false;
        for(let reducer of reducers){
            if(!hasChanged) hasChanged = reducer(board, possibleValues);
            else reducer(board, possibleValues);
        }
    }while(hasChanged);
    let rollbacks = [];
    for(let row = 0; row < 9; ++row){
        for(let col = 0; col < 9; ++col){
            if(possibleValues[row][col].size === 1){
                board[row][col] = possibleValues[row][col].keys().next().value;
                rollbacks.push({row,col})
            }
            possibleValues[row][col].delete(board[row][col]);
        }
    }
    return (myBoard) => {
        rollbacks.forEach(({row,col}) => {
            myBoard[row][col] = "";
        });
    }
}

export function reduceByRows(board, possibleValues){
    let possibleValuesModified = false;
    for(let row = 0; row < 9; ++row){
        const valuesInRow = Array(9).fill(false);
        const emptyCells = [];
        for(let col = 0; col < 9; ++col){
            const value = board[row][col];
            if(value === "") emptyCells.push({row, col});
            else{
                for(let i = 1; i <= 9; ++i) possibleValues[row][col].delete(i);
                valuesInRow[value-1] = true;
            }
        }
        for(let emptyCell of emptyCells){
            const { row, col } = emptyCell;
            valuesInRow.forEach((isInRow, index) => {
                if(isInRow && possibleValues[row][col].has(index + 1)){
                    possibleValues[row][col].delete(index + 1);
                    possibleValuesModified = true;
                }
            });
        }
        for(let emptyCell of emptyCells){
            const { row, col } = emptyCell;
            valuesInRow.forEach((isInRow, index) => {
                if(possibleValues[row][col].has(index + 1)){
                    let uniqueValue = true;
                    emptyCells.forEach(anotherEmptyCell => {
                        if(emptyCell.row !== anotherEmptyCell.row || emptyCell.col !== anotherEmptyCell.col){
                            if(possibleValues[anotherEmptyCell.row][anotherEmptyCell.col].has(index + 1)) uniqueValue = false;
                        }
                    });
                    if(uniqueValue){
                        for(let i = 1; i <= 9; ++i){
                            if(i !== index + 1){
                                possibleValues[row][col].delete(i);
                            }
                        }
                    }
                }
            });
        }
    }
    return possibleValuesModified;
}

export function reduceByColumns(board, possibleValues){
    let possibleValuesModified = false;
    for(let col = 0; col < 9; ++col){
        const valuesInCol = Array(9).fill(false);
        const emptyCells = [];
        for(let row = 0; row < 9; ++row){
            const value = board[row][col];
            if(value === "") emptyCells.push({row, col});
            else valuesInCol[value-1] = true;
        }
        for(let emptyCell of emptyCells){
            const { row, col } = emptyCell;
            valuesInCol.forEach((isInCol, index) => {
                if(isInCol && possibleValues[row][col].has(index + 1)){
                    possibleValues[row][col].delete(index + 1);
                    possibleValuesModified = true;
                }
            });
        }
        for(let emptyCell of emptyCells){
            const { row, col } = emptyCell;
            valuesInCol.forEach((isInCol, index) => {
                if(possibleValues[row][col].has(index + 1)){
                    let uniqueValue = true;
                    emptyCells.forEach(anotherEmptyCell => {
                        if(emptyCell.row !== anotherEmptyCell.row || emptyCell.col !== anotherEmptyCell.col){
                            if(possibleValues[anotherEmptyCell.row][anotherEmptyCell.col].has(index + 1)) uniqueValue = false;
                        }
                    });
                    if(uniqueValue){
                        for(let i = 1; i <= 9; ++i){
                            if(i !== index + 1){
                                possibleValues[row][col].delete(i);
                            }
                        }
                    }
                }
            });
        }
    }
    return possibleValuesModified;
}

export function reduceBySquares(board, possibleValues){
    let possibleValuesModified = false;
    for(let square = 0; square < 9; ++square){
        const squareBegin = (square%3)*3;
        const squareEnd = squareBegin + 3;
        const valuesInSquare = Array(9).fill(false);
        const emptyCells = [];
        for(let x = squareBegin; x < squareEnd; ++x){
            for(let y = parseInt(square/3)*3; y < parseInt(square/3)*3+3; ++y){
                const value = board[y][x];
                if(value === "") emptyCells.push({row: y, col: x});
                else valuesInSquare[value-1] = true;
            }
        }
        for(let emptyCell of emptyCells){
            const { row, col } = emptyCell;
            valuesInSquare.forEach((isInSquare, index) => {
                if(isInSquare && possibleValues[row][col].has(index + 1)){
                    possibleValues[row][col].delete(index + 1);
                    possibleValuesModified = true;
                }
            });
        }
        for(let emptyCell of emptyCells){
            const { row, col } = emptyCell;
            valuesInSquare.forEach((isInSquare, index) => {
                if(possibleValues[row][col].has(index + 1)){
                    let uniqueValue = true;
                    emptyCells.forEach(anotherEmptyCell => {
                        if(emptyCell.row !== anotherEmptyCell.row || emptyCell.col !== anotherEmptyCell.col){
                            if(possibleValues[anotherEmptyCell.row][anotherEmptyCell.col].has(index + 1)) uniqueValue = false;
                        }
                    });
                    if(uniqueValue){
                        for(let i = 1; i <= 9; ++i){
                            if(i !== index + 1){
                                possibleValues[row][col].delete(i);
                            }
                        }
                    }
                }
            });
        }
    }
    return possibleValuesModified;
}