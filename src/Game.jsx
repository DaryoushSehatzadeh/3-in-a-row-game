import { useEffect, useState } from 'react'
import axios from 'axios'

import Board from './Board';

export default function Game( {apiUrl} ){
    const [gameData, setGameData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [checkDisplay, setCheckDisplay] = useState('...')
    const [showMistakes, setShowMistakes] = useState(false)

    //Flatten the 2d object array for easier analysis later on
    const squares = gameData?.rows.flat()

    useEffect(() => {
      axios.get(apiUrl)
            .then(response => {
                setGameData(response.data);
            })
            .catch(() => {
                console.log("Error fetching Data.");
            })
    }, [refresh])

    const handleRefresh = () => {
        setRefresh((prev) => !prev)
        setCheckDisplay('...')
    }

    const handleSquareClick = (rowIndex, colIndex) => {
        //Select current square
        const currentSquare = gameData.rows[rowIndex][colIndex]
        if (currentSquare.canToggle){
            //Shallow copy of all rows
            const updatedRows = [...gameData.rows];

            //Shallow copy of all squares in the row except changed square
            updatedRows[rowIndex] = updatedRows[rowIndex].map((square, index) =>
                index === colIndex ? { ...square, currentState: (square.currentState === 2 ? 0 : square.currentState + 1) } : square
            );

            setGameData({ ...gameData, rows: updatedRows });
            //Reset message box on click
            setCheckDisplay('...')
        }
    };

    const handleCheck = () => {
        if (squares.every(square => square.currentState == square.correctState)){
            setCheckDisplay('You did it!! :D')
        } else if (squares.every(square => square.currentState == 0 || square.currentState == square.correctState)){
            setCheckDisplay('So far so good! :)')
        } else {
            setCheckDisplay('Uh oh, something is wrong! :(')
        }
    }

    const handleShowMistakes = () => {
        setShowMistakes(prev => !prev)
    }

    return (<>
        <button id='Refresh' onClick={handleRefresh}>Refresh</button>
        {gameData ? <Board gameData={gameData} showMistakes={showMistakes} handleSquareClick={handleSquareClick} /> : <div>Loading...</div>}
        <input type='checkbox' id='Show Mistakes' onClick={handleShowMistakes}/>
        <label for='Show Mistakes'>Show Mistakes</label>
        <br></br>
        <button id='Check' onClick={handleCheck}>Check</button>
        <br></br>
        <h3 id='Error Display'>{checkDisplay}</h3>
        </>)
}