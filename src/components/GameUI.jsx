import GameBoard from "./GameBoard";
import { useState } from "react";
import { copyBoard, solveBoard } from "../features/solver";

export default function GameUI(){

    /*const [board, setBoard] = useState([
        ["", 9, "", 7, "", "", "", "", ""],
        ["", "", 2, "", "", "", 3, "", ""],
        [4, "", "", "", 5, 9, "", 1, ""],
        ["", "", "", 4, "", "", "", 7, ""],
        ["", 3, "", "", 7, 6, 1, "", ""],
        [6, "", "", 8, "", "", "", "", ""],
        [9, "", "", "", 6, 1, "", 5, ""],
        ["", "", "", "", "", 8, "", "", ""],
        ["", 4, "", "", "", "", "", "", 9]
    ]);*/

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
        const newBoard = solveBoard(copyBoard(board));
        console.log("New board: ", newBoard);
        setBoard(newBoard);
    }

    return(
        <div className="game-ui-container">
            <GameBoard board={board} setBoard={setBoard} />
            <button className="solve-btn" onClick={onSolve}>Solve</button>
        </div>
    )
}