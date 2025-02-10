import Square from "./Square";

export default function Board( {gameData, handleSquareClick, showMistakes} ) {
    return (
        <>
            {gameData?.rows.map((row, rowIndex) => (
                <div className="row" key={crypto.randomUUID()}>
                    {row.map((square, colIndex) => {
                        const isError = square.currentState !== square.correctState && square.currentState !== 0;
                        const squareClass = `${square.canToggle ? 'square' : 'static'} state${square.currentState} ${showMistakes && isError ? 'error' : ''}`;

                        return (<Square
                            key={crypto.randomUUID()}
                            className={squareClass}
                            onClick={() => handleSquareClick(rowIndex,colIndex)}
                        />)
                    })}
                </div>
            ))}
        </>
    );
}