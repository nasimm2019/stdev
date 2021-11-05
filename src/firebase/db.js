//this is going to store Firebase realtime database API code
import { db } from "./firebase";

//##########3 user API

//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

//returns all users from firebase realtime db
export const onceGetUsers = () => db.ref("users").once("value");

export const doGetAnUnser = (uid) => db.ref(`users/${uid}`).once("value");

// other APIs could come below

//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateArticle = (
  id,
  title,
  description,
  created_at,
  author_name,
  category_name
) =>
  db.ref(`article/${id}`).set({
    title,
    description,
    created_at,
    author_name,
    category_name,
  });
//returns all users from firebase realtime db
export const onceGetArticles = () => db.ref("article").once("value");
export const searchArticles = (query) => {
  db.ref("article")
    .orderByChild("title")
    .startAt(query)
    .on("value", function(snapshot) {
      console.log(snapshot.val());
      return snapshot;
    });
};
export const doGetAnArticle = (uid) => db.ref(`article/${uid}`).once("value");

export const doCreateComment = (id, name, text, articleId) =>
  db.ref(`comment/${id}`).set({
    id,
    name,
    text,
    articleId,
  });
