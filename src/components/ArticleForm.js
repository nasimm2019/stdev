import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import categories from "../data-server/categories.json";

const ArticleForm = (props) => {
  const { show, onSave, loading } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const handleClick = () => {
    onSave(Math.floor(Math.random() * 100), title, description, category);
    setTitle("");
    setDescription("");
  };
  const isInvalid = title === "" || description === "" || category === "";
  return (
    <Modal show={show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Add new Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
          />
        </Form.Group>
        <div className="d-flex flex-column m2-5 mt-2">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            {categories.map((item) => {
              return (
                <option value={item.title} key={item.id}>
                  {item.title}
                </option>
              );
            })}
          </Form.Select>
        </div>
        <Form.Group>
          <Form.Label>Main Text</Form.Label>
          <Form.Control
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
export default ArticleForm;
