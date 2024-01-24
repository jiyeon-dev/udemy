import Player from "./components/Player";

function App() {
  console.log("App component rendered");

  return (
    <main>
      <div id='game-container'>
        <ol id='players'>
          <Player initialName='player 1' symbol='X' />
          <Player initialName='player 2' symbol='O' />
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  );
}

export default App;
