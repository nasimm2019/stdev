import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ArticleForm, withAuthorization, Spinner } from "../components";
import { setArticles } from "../redux/actions/actions";
import { db } from "../firebase";
const Articles = (props) => {
  const { loggedUser } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    getArticles();
  }, []);
  const getArticles = () => {
    db.onceGetArticles().then((res) => {
      dispatch(setArticles(res.val()));
    });
  };
  const articles = useSelector((state) => state.article.articles);
  const loading = useSelector((state) => state.article.loading);
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleClose = () => setShow(false);
  const handleSave = (id, title, description, category) => {
    setSubmitting(true);
    db.doCreateArticle(
      id,
      title,
      description,
      Date.now(),
      loggedUser.email,
      category
    )
      .then((res) => {
        getArticles();
        setSubmitting(false);
        setShow(false);
      })
      .catch((error) => {
        setSubmitting(false);
      });
  };
  const onClickAddBtn = () => {
    setShow(true);
  };
  const onSearch = async () => {
    var ref = firebase.database().ref("article");
    ref
      .orderByChild("title")
      .startAt(searchValue)
      .on("value", function(snapshot) {
        dispatch(setArticles(snapshot.val()));
      });
  };
  const onSort = async () => {
    var ref = firebase.database().ref("article");
    ref.orderByChild("created_at").on("value", function(snapshot) {
      dispatch(setArticles(snapshot.val()));
    });
  };
  return (
    <div>
      <ArticleForm
        show={show}
        onHide={handleClose}
        onSave={handleSave}
        loading={submitting}
      />
      <Container>
        <div className="d-flex justify-content-between mt-5 mb-5">
          <h1>Articles</h1>
          <Button onClick={onClickAddBtn}>Add new Article</Button>
        </div>
        <div className="d-flex justify-content-between mt-5 mb-5">
          <Form className="d-flex">
            <input
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="outline-success" onClick={onSearch}>
              Search
            </Button>
          </Form>
          {/* <div>
            {" "}
            <Button onClick={onSort}>Sort</Button>
          </div> */}
        </div>
        {loading ? (
          <div className="centered">
            <Spinner />
          </div>
        ) : (
          <Row className="mt-5">
            {Object.keys(articles).map((key) => (
              <Col className="mb-2" lg="6" sm="4" xs="6" key={key}>
                <Card body>
                  <Card.Title>{articles[key].title}</Card.Title>
                  <Card.Text>{articles[key].description}</Card.Text>
                  <Link to={`/article/${key}`}>Go to Article</Link>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Articles);
