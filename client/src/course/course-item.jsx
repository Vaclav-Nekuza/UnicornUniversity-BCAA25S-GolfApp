import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiPencilOutline, mdiClose } from "@mdi/js";

function CourseItem({
                      hole,
                      par,
                      hcp,
                      setHcpEditForm,
                      setHcpDeleteDialog,
                    }) {
  return (
      <Col xs={12} md={6} lg={4}>
        <Card>
          <Card.Body>
            <div style={{ position: "relative" }}>
              <h4>Hole {hole}</h4>
              <p>Par: {par}</p>
              <p>HCP: {HCP}</p>
              <div style={{ position: "absolute", top: "0", right: "0" }}>
                <Button
                    className="border-0 p-1"
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setHcpEditForm({ hole, par, hcp })}
                >
                  <Icon path={mdiPencilOutline} size={0.8} />
                </Button>
                <Button
                    className="border-0 p-1"
                    variant="outline-danger"
                    size="sm"
                    onClick={() => setHcpDeleteDialog({ hole, par, hcp })}
                >
                  <Icon path={mdiClose} size={0.8} />
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
  );
}

export default CourseItem;