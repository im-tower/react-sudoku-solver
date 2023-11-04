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
    if(possibleValuesBoard === null) possibleValuesBoard = Array(9).fill(null).map(() => Array(9).fill(new Set()));
    let auxBoard = board;
    const reducedBoard = auxBoard;
    if(!validateBoard(reducedBoard)) return null;
    for(let row = lastRow; row < 9; ++row){
        for(let col = (row === lastRow ? lastCol : 0); col < 9; ++col){
            if(reducedBoard[row][col] === ""){
                const values = getPossibleValues(reducedBoard, row, col);
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

export function getPossibleValues(board, row, col){
    let forbbidenValues = new Set();
    for(let i = 0; i < 9; ++i){
        if(board[row][i] !== "" && i !== col){
            forbbidenValues.add(board[row][i]);
        }
    }
    for(let i = 0; i < 9; ++i){
        if(board[i][col] !== "" && i !== row){
            forbbidenValues.add(board[i][col]);
        }
    }
    const square = parseInt(col/3) + parseInt(row/3)*3;
    const squareBegin = (square%3)*3;
    const squareEnd = squareBegin + 3;
    for(let x = squareBegin; x < squareEnd; ++x){
        for(let y = parseInt(square/3)*3; y < parseInt(square/3)*3+3; ++y){
            if(board[y][x] !== "" && x !== col && y !== row){
                forbbidenValues.add(board[y][x]);
            }
        }
    }
    const possibleValues = [];
    for(let i = 1; i <= 9; ++i){
        if(!forbbidenValues.has(i)) possibleValues.push(i);
    }
    return possibleValues;
}

export function reduceBoard(board, possibleValues){
    const reducers = [
        reduceByRows,
        reduceByColumns
    ];
    do{
       let hasChanged = false;
       for(let reducer of reducers){
            hasChanged = reducer(board, possibleValues);
       }
    }while(hasChanged);
}

export function reduceByRows(board, possibleValues){
    let possibleValuesModified = false;
    for(let row = 0; row < 9; ++row){
        const valuesInRow = Array(9).fill(false);
        const emptyCells = [];
        for(let col = 0; col < 9; ++col){
            const value = board[row][col];
            if(value === "") emptyCells.push({row, col});
            else valuesInRow[value-1] = true;
        }
        for(let emptyCell of emptyCells){
            const { row, col } = emptyCell;
            valuesInRow.forEach((isInRow, index) => {
                if(!isInRow){
                    possibleValues[row][col].add(index + 1);
                    possibleValuesModified = true;
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
                if(!isInCol){
                    possibleValues[row][col].add(index + 1);
                    possibleValuesModified = true;
                }
            });
        }
    }
    return possibleValuesModified;
}
