import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiPencilOutline, mdiClose } from "@mdi/js";

function GameItem({
                    score,
                    setGameItemFormData,
                    setGameItemDeleteDialog,
                  }) {
  return (
      <ListGroup.Item variant="light">
        <Stack direction="horizontal" gap={3}>
          <div>
            <strong>Hole {score.hole}</strong><br />
            <small>Par: {score.par} | Score: {score.score}</small>
          </div>
          <div className="ms-auto d-flex gap-1">
            <Button
                className="border-0 p-1"
                variant="outline-primary"
                size="sm"
                onClick={() => setGameItemFormData(score)}
            >
              <Icon path={mdiPencilOutline} size={0.8} />
            </Button>
            <Button
                className="border-0 p-1"
                variant="outline-danger"
                size="sm"
                onClick={() => setGameItemDeleteDialog(score)}
            >
              <Icon path={mdiClose} size={0.8} />
            </Button>
          </div>
        </Stack>
      </ListGroup.Item>
  );
}

export default GameItem;
