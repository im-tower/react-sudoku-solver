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