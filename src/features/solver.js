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

export function reduceByRows(board){
    for(let row = 0; row < 9; ++row){
        const valuesInRow = Array(9).fill(false);
        const emptyCells = [];
        for(let col = 0; col < 9; ++col){
            const value = board[row][col];
            if(value === ""){
                emptyCells.push(col);
                if(emptyCells.length > 1) break;
                continue;
            }
            valuesInRow[value-1] = true;
        }
        if(emptyCells.length === 1){
            board[row][emptyCells[0]] = valuesInRow.indexOf(false)+1;
        }
    }
    return board;
}

export function reduceByColumns(board){
    for(let col = 0; col < 9; ++col){
        const valuesInCol = Array(9).fill(false);
        const emptyCells = [];
        for(let row = 0; row < 9; ++row){
            const value = board[row][col];
            if(value === ""){
                emptyCells.push(row);
                if(emptyCells.length > 1) break;
                continue;
            }
            valuesInCol[value-1] = true;
        }
        if(emptyCells.length === 1){
            board[emptyCells[0]][col] = valuesInCol.indexOf(false)+1;
        }
    }
    return board;
}

export function reduceBySquares(board){
    for(let square = 0; square < 9; ++square){
        const squareBegin = (square%3)*3;
        const squareEnd = squareBegin + 3;
        const valuesInSquare = Array(9).fill(false);
        const emptyCells = [];
        for(let x = squareBegin; x < squareEnd; ++x){
            for(let y = parseInt(square/3)*3; y < parseInt(square/3)*3+3; ++y){
                const value = board[y][x];
                if(value === ""){
                    emptyCells.push({x,y});
                    if(emptyCells.length > 1) break;
                    continue;
                }
                valuesInSquare[value-1] = true;
            }
            if(emptyCells.length > 1) break;
        }
        if(emptyCells.length === 1){
            board[emptyCells[0].y][emptyCells[0].x] = valuesInSquare.indexOf(false)+1;
        }
    }
    return board;
}

export function solveBoard(board){
    let auxBoard = copyBoard(board);
    let lastBoard = null;
    do{
        lastBoard = copyBoard(auxBoard);
        auxBoard = reduceByRows(auxBoard);
        auxBoard = reduceByColumns(auxBoard);
        auxBoard = reduceBySquares(auxBoard);
    }while(!equals(auxBoard, lastBoard));
    const reducedBoard = copyBoard(auxBoard);
    if(!validateBoard(reducedBoard)) return null;
    if(!hasEmptyCells(reducedBoard)) return reducedBoard;
    for(let row = 0; row < 9; ++row){
        for(let col = 0; col < 9; ++col){
            if(reducedBoard[row][col] !== "") continue;
            for(let value = 1; value <= 9; ++value){
                reducedBoard[row][col] = value;
                const solution = solveBoard(reducedBoard);
                if(solution !== null) return solution;
            }
            return null;
        }
    }
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