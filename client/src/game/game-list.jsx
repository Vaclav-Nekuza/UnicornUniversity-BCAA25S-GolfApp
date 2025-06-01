import Container from "react-bootstrap/esm/Container";
import GameListProvider from "./game-list-provider";
import GameListContent from "./game-list-content";

function GameList() {
  return (
    <Container>
      <GameListProvider>
        <GameListContent />
      </GameListProvider>
    </Container>
  );
}

export default GameList;
