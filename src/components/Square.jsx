export default function Square({value, onClick, isSelected}) {

    return (
        <button className={"square" + (isSelected ? " square--selected" : "")} onClick={onClick}>
            {
                value === "\n" ? "" : value
            }
        </button>
    );

}
