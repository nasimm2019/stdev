import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { withAuthorization, Spinner, CommentForm } from "../components";
import { Button, Card, Row, Col } from "react-bootstrap";
import { db } from "../firebase";
const ArticleDetails = (props) => {
  const articleId = props.match.params.id;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState(null);
  useEffect(() => {
    getArticle();
    getPosts();
  }, []);
  const getArticle = () => {
    db.doGetAnArticle(articleId).then(function(dataSnapshot) {
      setArticle(dataSnapshot.val());
      setLoading(false);
    });
  };
  const getPosts = () => {
    var ref = firebase.database().ref("comment");
    ref
      .orderByChild("articleId")
      .equalTo(articleId.toString())
      .on("value", function(snapshot) {
        setComments(snapshot.val());
      });
  };
  const handleClose = () => setShow(false);
  const handleSave = (id, name, text) => {
    setSubmitting(true);
    db.doCreateComment(id, name, text, articleId)
      .then((res) => {
        setSubmitting(false);
        setShow(false);
        getPosts();
      })
      .catch((error) => {
        setSubmitting(false);
      });
  };
  return (
    <>
      <CommentForm
        show={show}
        onHide={handleClose}
        onSave={handleSave}
        loading={submitting}
      />
      {loading ? (
        <div className="centered">
          <Spinner />
        </div>
      ) : (
        <div className="container my-5">
          <div className="mx-auto text-secondary">
            <div>
              <small>
                <a href="/" className="text-primary">
                  {article.category_name}
                </a>
              </small>
            </div>
            <h1 class="font-weight-bold text-dark">{article.title}</h1>
            <p class="my-2">{article.description}</p>
          </div>
          <div class="my-3 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <img
                src="https://avatars0.githubusercontent.com/u/39916324?s=460&u=602ca47fcce463981a2511a21148236f304ec934&v=4"
                style={{
                  width: 50,
                }}
                alt=""
              />
              <small class="ml-2">
                <a href="/" class="text-primary d-block">
                  {article.author_name}
                </a>
                <span>{new Date(article.created_at * 1000).toUTCString()}</span>
              </small>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-5 mb-5">
            <h5>Comments</h5>
            <Button onClick={() => setShow(true)}>Add new Comment</Button>
          </div>
          {comments && (
            <Row className="mt-5">
              {Object.keys(comments).map((key) => (
                <Col className="mb-2" lg="12" sm="4" xs="6" key={key}>
                  <Card body>
                    <Card.Title>{comments[key].name}</Card.Title>
                    <Card.Text>{comments[key].text}</Card.Text>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </>
  );
};
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(ArticleDetails);
