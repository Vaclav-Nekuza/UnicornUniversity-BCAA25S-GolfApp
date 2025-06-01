import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/esm/Stack";

import { CourseListContext } from "./course-list-provider";
import CourseItem from "./course-item";

function GameDetail({
  gameId,
  sum,
  itemList,
  setCourseItemFormData,
  setCourseItemDeleteDialog,
}) {
  const { data } = useContext(CourseListContext);

  return (
    <Accordion.Item eventKey={gameId} style={{ width: "100%" }}>
      <Accordion.Header className="p-0">
        <Stack direction="horizontal" gap={2}>
          <div>{data?.gameMap[gameId].name}</div>
          <div>{sum.toLocaleString("cs")}</div>
        </Stack>
      </Accordion.Header>
      <Accordion.Body>
        <Row>
          {itemList?.map((item) => {
            return (
              <CourseItem
                item={item}
                setCourseItemFormData={setCourseItemFormData}
                setCourseItemDeleteDialog={setCourseItemDeleteDialog}
              />
            );
          })}
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default GameDetail;
