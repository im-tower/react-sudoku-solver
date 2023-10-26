import Square from "./Square";

export default function GameBoard(){
    return(
        <div className="board-container">
            {
                Array.from(Array(9).keys()).map((i) => 
                    <div key={i} className="board-row">
                        {
                            Array.from(Array(9).keys()).map((j) => 
                                <Square key={j} value={"3"} />
                            )
                        }
                    </div>    
                )
            }
        </div>
    );
}