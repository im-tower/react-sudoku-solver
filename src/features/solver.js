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