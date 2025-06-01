import { useContext, useMemo, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";

import Icon from "@mdi/react";
import { mdiCashPlus, mdiSigma } from "@mdi/js";

import { CourseListContext } from "./course-list-provider";
import PendingItem from "./pending-item";
import CourseItemForm from "./course-item-form";
import CourseItemDeleteDialog from "./course-item-delete-dialog";
import GameDetail from "./game-detail";

function DashboardContent() {
  const [courseItemFormData, setCourseItemFormData] = useState();
  const [courseItemDeleteDialog, setCourseItemDeleteDialog] = useState();

  const { state, data, selectedMonth, setSelectedMonth } = useContext(CourseListContext);

  const dashboardData = useMemo(() => {
    const result = {
      totalDifferential: 0,
      underPar: 0,
      overPar: 0,
      overParMap: {},
      underParMap: {},
    };

    data?.itemList?.forEach((item) => {
      result.totalDifferential += item.amount;

      if (item.amount < 0) {
        result.underPar += item.amount;
        if (!result.underParMap[item.gameId]) {
          result.underParMap[item.gameId] = { total: 0, holes: [] };
        }
        result.underParMap[item.gameId].total += item.amount;
        result.underParMap[item.gameId].holes.push(item);
      } else {
        result.overPar += item.amount;
        if (!result.overParMap[item.gameId]) {
          result.overParMap[item.gameId] = { total: 0, holes: [] };
        }
        result.overParMap[item.gameId].total += item.amount;
        result.overParMap[item.gameId].holes.push(item);
      }
    });

    return result;
  }, [data]);

  return (
      <Card className="border-0">
        {!!courseItemFormData && (
            <CourseItemForm item={courseItemFormData} onClose={() => setCourseItemFormData()} />
        )}
        {!!courseItemDeleteDialog && (
            <CourseItemDeleteDialog item={courseItemDeleteDialog} onClose={() => setCourseItemDeleteDialog()} />
        )}

        <Card.Header className="sticky-top bg-white" style={{ top: "56px", padding: "8px" }}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
                size="lg"
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            />
            <div className="ms-auto">
              <Button
                  id="myButton"
                  variant="success"
                  size="sm"
                  disabled={state === "pending"}
                  onClick={() => setCourseItemFormData({})}
              >
                <Icon path={mdiCashPlus} size={0.8} /> Add score
              </Button>
            </div>
          </Stack>
        </Card.Header>

        <Card.Body className="px-0" style={{ position: "relative", top: "40px" }}>
          {state === "pending" && !data ? (
              [0, 1, 2, 3].map((item) => <PendingItem key={item} />)
          ) : (
              <>
                <Stack className="px-1 py-2">
                  <div
                      className={`ms-auto ${dashboardData.totalDifferential < 0 ? "text-success" : "text-danger"}`}
                      style={{ fontSize: "24px", display: "flex", alignItems: "center" }}
                  >
                    <Icon path={mdiSigma} size={1.1} />
                    &nbsp; {`${dashboardData.totalDifferential.toLocaleString("cs")}`}
                  </div>
                </Stack>

                <Card className="border-0">
                  <Card.Body>
                    <Card.Title>
                      <Stack direction="horizontal" gap={1}>
                        Under Par
                        <div className="ms-auto" style={{ display: "flex", alignItems: "center" }}>
                          {`${dashboardData.underPar.toLocaleString("cs")}`}
                        </div>
                      </Stack>
                    </Card.Title>
                    <Card.Text>
                      <Accordion>
                        {Object.keys(dashboardData.underParMap).map((gameId) => (
                            <GameDetail
                                key={gameId}
                                gameId={gameId}
                                average={dashboardData.underParMap[gameId].total}
                                itemList={dashboardData.underParMap[gameId].holes}
                                setCourseItemFormData={setCourseItemFormData}
                                setCourseItemDeleteDialog={setCourseItemDeleteDialog}
                            />
                        ))}
                      </Accordion>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="border-0">
                  <Card.Body>
                    <Card.Title>
                      <Stack direction="horizontal" gap={1}>
                        Over Par
                        <div className="ms-auto" style={{ display: "flex", alignItems: "center" }}>
                          {`${dashboardData.overPar.toLocaleString("cs")}`}
                        </div>
                      </Stack>
                    </Card.Title>
                    <Card.Text>
                      <Accordion>
                        {Object.keys(dashboardData.overParMap).map((gameId) => (
                            <GameDetail
                                key={gameId}
                                gameId={gameId}
                                average={dashboardData.overParMap[gameId].total}
                                itemList={dashboardData.overParMap[gameId].holes}
                                setCourseItemFormData={setCourseItemFormData}
                                setCourseItemDeleteDialog={setCourseItemDeleteDialog}
                            />
                        ))}
                      </Accordion>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </>
          )}
        </Card.Body>
      </Card>
  );
}

export default DashboardContent;
