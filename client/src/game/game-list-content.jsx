import { useContext, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";

import Icon from "@mdi/react";
import { mdiTagPlusOutline } from "@mdi/js";

import { GameListContext } from "./game-list-provider";
import PendingItem from "./pending-item";
import GameItem from "./game-item";
import GameItemForm from "./game-item-form";
import GameItemDeleteDialog from "./game-item-delete-dialog";

function GameListContent() {
  const [gameItemFormData, setGameItemFormData] = useState();
  const [gameItemDeleteDialog, setGameItemDeleteDialog] = useState();
  const { state, data } = useContext(GameListContext);

  return (
    <Card className="border-0">
      {!!gameItemFormData ? (
        <GameItemForm
          data={gameItemFormData}
          onClose={() => setGameItemFormData()}
        />
      ) : null}
      {!!gameItemDeleteDialog ? (
        <GameItemDeleteDialog
          data={gameItemDeleteDialog}
          onClose={() => setGameItemDeleteDialog()}
        />
      ) : null}
      <Card.Header
        className="sticky-top "
        bsPrefix="bg-white"
        style={{ top: "56px", padding: "8px" }}
      >
        <Stack direction="horizontal" gap={3}>
          <div>Categories</div>
          <div className=" ms-auto">
            <Button
              className="me-auto"
              variant="success"
              size="sm"
              disable={state === "pending"}
              p={2}
              onClick={() => setGameItemFormData({})}
            >
              <Icon path={mdiTagPlusOutline} size={0.8} /> Add game
            </Button>
          </div>
        </Stack>
      </Card.Header>
      <Card.Body className="px-0" style={{ position: "relative", top: "40px" }}>
        {state === "pending" && !data
          ? [0, 1, 2, 3].map((item) => <PendingItem key={item} />)
          : null}
        {data?.itemList ? (
          <ListGroup className="border-1">
            {data.itemList.map((item) => (
              <GameItem
                key={item.id}
                data={item}
                setGameItemFormData={setGameItemFormData}
                setGameItemDeleteDialog={setGameItemDeleteDialog}
              />
            ))}
          </ListGroup>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default GameListContent;
