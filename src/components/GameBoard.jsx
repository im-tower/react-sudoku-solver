import { reduceByColumns, reduceByRows, reduceBySquares, validateBoard } from "../features/solver";
import Square from "./Square";
import { useState } from "react";

export default function GameBoard(){
    const [board, setBoard] = useState([
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""]
    ]);
    const [selectedSquare, setSelectedSquare] = useState({x: 0, y: 0});
    const [numbers_grid_visible, setNumbersGridVisible] = useState(false);
    const [numbers_grid_position, setNumbersGridPosition] = useState({
        x: 0,
        y: 0
    });
    const [validNumbers, setValidNumbers] = useState([true, true, true, true, true, true, true, true, true]);
    const onSquareClick = (clientX, clientY, squareX, squareY) => {
        setNumbersGridVisible(true);
        setNumbersGridPosition({
            x: clientX - 10,
            y: clientY + 20
        });
        setSelectedSquare({
            x: squareX,
            y: squareY
        });
        const newValidNumbers = [false, false, false, false, false, false, false, false, false];
        for(let i = 1; i <= 9; i++){
            const newBoard = [...board];
            const previousValue = newBoard[squareY][squareX];
            newBoard[squareY][squareX] = i;
            if(validateBoard(newBoard)) newValidNumbers[i - 1] = true;
            newBoard[squareY][squareX] = previousValue;
        }
        setValidNumbers(newValidNumbers);
    }
    const onGridNumberClick = (value) => {
        const newBoard = [...board];
        newBoard[selectedSquare.y][selectedSquare.x] = value;
        reduceByRows(newBoard);
        reduceByColumns(newBoard);
        reduceBySquares(newBoard);
        setBoard(newBoard);
        setSelectedSquare({x: 0, y: 0});
        setNumbersGridVisible(false);
    }
    return(
        <div className="board-container">
            {
                Array.from(Array(9).keys()).map((i) => 
                    <div key={i} className="board-row">
                        {
                            Array.from(Array(9).keys()).map((j) => 
                                <Square key={j} value={board[i][j]} onClick={({clientX, clientY}) => onSquareClick(clientX, clientY, j, i)} />
                            )
                        }
                    </div>    
                )
            }
            <div className="numbers-grid"
                style={
                    {
                        display: numbers_grid_visible ? "block" : "none",
                        top: numbers_grid_position.y,
                        left: numbers_grid_position.x
                    }
                }
            >
                {
                    validNumbers.map((available, index) => <button onClick={() => onGridNumberClick(index+1)} key={index+1} disabled={!available}>{index+1}</button>)
                }
            </div>
        </div>
    );
}