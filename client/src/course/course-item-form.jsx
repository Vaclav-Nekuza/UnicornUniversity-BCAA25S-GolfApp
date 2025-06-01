import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { CourseListContext } from "./course-list-provider.jsx";

function CourseItemForm({ item, onClose }) {
  const { state, data, error, handlerMap } = useContext(CourseListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          values.amount = Number(values.amount);

          let result;
          if (item?.id) {
            result = await handlerMap.handleUpdate({
              id: item.id,
              ...values,
            });
          } else {
            result = await handlerMap.handleCreate({ ...values });
          }
          if (result.ok) {
            onClose();
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{item?.id ? "Update" : "Add"} course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" ? (
            <Alert variant={"danger"}>{error.message}</Alert>
          ) : null}
          <Form.Label>Counter party</Form.Label>
          <Form.Control
            type="text"
            name="counterparty"
            defaultValue={item?.counterparty}
            disabled={state === "pending"}
            required
          />
          <Form.Label>Note</Form.Label>
          <Form.Control
            type="text"
            name="note"
            defaultValue={item?.note}
            disabled={state === "pending"}
          />
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            defaultValue={item?.amount}
            disabled={state === "pending"}
            required
          />
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            defaultValue={
              item?.date
                ? new Date(item?.date).toISOString().slice(0, 10)
                : new Date().toISOString().slice(0, 10)
            }
            disabled={state === "pending"}
            required
          />
          <Form.Label>Course</Form.Label>
          <Form.Select
            type="select"
            name="courseId"
            defaultValue={item?.courseId}
            disabled={state === "pending"}
            required
          >
            {data?.courseMap
              ? Object.keys(data.courseMap).map((courseId) => {
                  return (
                    <option key={courseId} value={courseId}>
                      {data.courseMap[courseId].name}
                    </option>
                  );
                })
              : null}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={state === "pending"}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={state === "pending"}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CourseItemForm;
