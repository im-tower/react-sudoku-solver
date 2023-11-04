import GameBoard from "./GameBoard";
import { useState } from "react";
import { copyBoard, equals, solveBoard } from "../features/solver";
import { useEffect } from "react";

export default function GameUI(){

    const [selectedBoard, setBoard] = useState([
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

    const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);
    const [boards, setBoards] = useState([]);
    const [nonSoluble, setNonSoluble] = useState(false);

    const onSolve = () => {
        console.log("Solving")
        const copyOfBoard = copyBoard(selectedBoard);
        console.log(copyOfBoard)
        const tries = 10;
        const maxTime = 0.06;
        let solutions = [];
        const startTime = Date.now();
        for(let try_index = 0; try_index < tries; ++try_index){
            const solution = solveBoard(copyBoard(copyOfBoard));
            if(solution !== null) solutions.push(solution);
            if(Date.now() - startTime > maxTime * 1000) break;
        }
        if(solutions.length === 0){
            solutions.push(copyOfBoard);
            setNonSoluble(true);
            return;
        }else{
            setNonSoluble(false);
        }
        solutions = solutions.filter((solution, index) => solutions.find((other) => !equals(solution, other)) !== undefined || index === 0);
        setBoards(solutions);
        setSelectedBoardIndex(0);
    }

    useEffect(() => {
        if(boards.length === 0) return;
        setBoard(boards[selectedBoardIndex]);
    }, [selectedBoardIndex, boards]);

    return(
        <div className="game-ui-container">
            <GameBoard board={selectedBoard} setBoard={setBoard} />
            <div className="game-ui-buttons">
                <button
                    onClick={() => setSelectedBoardIndex(selectedBoardIndex-1)}
                    style={{visibility: (selectedBoardIndex === 0 ? 'hidden' : 'visible')}}
                >{'<'}</button>
                <button className="solve-btn" onClick={onSolve}>Solve</button>
                <button
                    onClick={() => setSelectedBoardIndex(selectedBoardIndex+1)}
                    style={{visibility: (selectedBoardIndex === boards.length - 1 || boards.length === 0 ? 'hidden' : 'visible')}}
                >{'>'}</button>
            </div>
            <p className="non-soluble" style={{visibility: (nonSoluble ? 'visible' : 'hidden')}}>This board cannot be solved</p>
            <p className="solutions-counter" style={{visibility: (boards.length > 0 ? 'visible' : 'hidden')}}>{boards.length} solutions founded.</p>
        </div>
    )
}