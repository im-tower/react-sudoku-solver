import { copyBoard, validateBoard } from "../features/solver";
import Square from "./Square";
import { useState } from "react";

export default function GameBoard({board, setBoard}){

    const [selectedSquare, setSelectedSquare] = useState({x: -1, y: -1});
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
        const newBoard = copyBoard(board);
        for(let i = 1; i <= 9; i++){
            const previousValue = newBoard[squareY][squareX];
            newBoard[squareY][squareX] = i;
            if(validateBoard(newBoard)) newValidNumbers[i - 1] = true;
            newBoard[squareY][squareX] = previousValue;
        }
        setValidNumbers(newValidNumbers);
    }
    const onGridNumberClick = (value) => {
        const newBoard = copyBoard(board);
        newBoard[selectedSquare.y][selectedSquare.x] = value;
        setBoard(newBoard);
        setSelectedSquare({x: -1, y: -1});
        setNumbersGridVisible(false);
    }
    const onKeyUp = ({key}) => {
        if(key === "Escape"){
            setSelectedSquare({x: -1, y: -1});
            setNumbersGridVisible(false);
        }else if(key === "ArrowUp"){
            const isTop = selectedSquare.y - 1 < 0;
            const newY = isTop ? 8 : selectedSquare.y - 1;
            setSelectedSquare({x: selectedSquare.x, y: newY});
            const newYPosition = isTop ? numbers_grid_position.y+50*8 : numbers_grid_position.y - 50;
            setNumbersGridPosition({...numbers_grid_position, y: newYPosition});
        }else if(key === "ArrowDown"){
            const isBottom = selectedSquare.y + 1 > 8;
            const newY = isBottom ? 0 : selectedSquare.y + 1;
            setSelectedSquare({x: selectedSquare.x, y: newY});
            const newYPosition = isBottom ? numbers_grid_position.y-50*8 : numbers_grid_position.y + 50;
            setNumbersGridPosition({...numbers_grid_position, y: newYPosition});
        }else if(key === "ArrowLeft"){
            const isLeft = selectedSquare.x - 1 < 0;
            const newX = isLeft ? 8 : selectedSquare.x - 1;
            setSelectedSquare({x: newX, y: selectedSquare.y});
            const newXPosition = isLeft ? numbers_grid_position.x+50*8 : numbers_grid_position.x - 50;
            setNumbersGridPosition({...numbers_grid_position, x: newXPosition});
        }else if(key === "ArrowRight"){
            const isRight = selectedSquare.x + 1 > 8;
            const newX = isRight ? 0 : selectedSquare.x + 1;
            setSelectedSquare({x: newX, y: selectedSquare.y});
            const newXPosition = isRight ? numbers_grid_position.x-50*8 : numbers_grid_position.x + 50;
            setNumbersGridPosition({...numbers_grid_position, x: newXPosition});
        }
    }
    return(
        <div className="board-container" onKeyUp={onKeyUp}>
            {
                Array.from(Array(9).keys()).map((i) => 
                    <div key={i} className="board-row">
                        {
                            Array.from(Array(9).keys()).map((j) => 
                                <Square key={j} value={board[i][j]} onClick={({clientX, clientY}) => onSquareClick(clientX, clientY, j, i)} isSelected={selectedSquare.y === i && selectedSquare.x === j} />
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