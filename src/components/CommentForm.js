import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const CommentForm = (props) => {
  const { show, onSave, loading } = props;
  const [title, setTitle] = useState("");
  const [text, seText] = useState("");

  const handleClick = () => {
    onSave(Math.floor(Math.random() * 100), title, text);
  };
  const isInvalid = title === "" || text === "";
  return (
    <Modal show={show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Add new Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Main Text</Form.Label>
          <Form.Control
            name="description"
            value={text}
            onChange={(e) => seText(e.target.value)}
            type="text"
            placeholder="Enter Main Text"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleClick}
          disabled={loading || isInvalid}
        >
          {loading ? "loading.." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CommentForm;
