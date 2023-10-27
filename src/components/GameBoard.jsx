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
    }
    const onGridNumberClick = (value) => {
        const newBoard = [...board];
        newBoard[selectedSquare.x][selectedSquare.y] = value;
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
                                <Square key={j} value={board[i][j]} onClick={({clientX, clientY}) => onSquareClick(clientX, clientY, i, j)} />
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
                    Array.from(Array(9).keys()).map((i) => <button onClick={() => onGridNumberClick(i+1)} key={i}>{i+1}</button>)
                }
            </div>
        </div>
    );
}