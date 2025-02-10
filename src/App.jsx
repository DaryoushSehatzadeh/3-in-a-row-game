import './App.css'
import Game from './Game.jsx'
import NavBar from './NavBar.jsx'


export default function App( {apiUrl} ){
  return (<>
  <NavBar />
  <br></br>
  <Game apiUrl={apiUrl} />
  </>)
};