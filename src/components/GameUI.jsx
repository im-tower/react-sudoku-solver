import GameBoard from "./GameBoard";
import { useState } from "react";
import { solveBoard } from "../features/solver";

export default function GameUI(){

    const [board, setBoard] = useState([
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", 5, "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""]
    ]);

    const onSolve = () => {
        const newBoard = solveBoard(board);
        setBoard(newBoard);
    }

    return(
        <div className="game-ui-container">
            <GameBoard board={board} setBoard={setBoard} />
            <button className="solve-btn" onClick={onSolve}>Solve</button>
        </div>
    )
}