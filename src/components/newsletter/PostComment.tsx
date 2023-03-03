import { Button, Card, Divider } from "antd";
import * as React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { Input } from "antd";
export interface IPostCommentProps {}

export function PostComment(props: IPostCommentProps) {
  const [post, setPost] = React.useState<Post>({
    id: 1,
    userId: 1,
    title: "hello ",
    body: " ",
  });
  const [comments, setComments] = React.useState<Comment[]>();
  const params = useParams();
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + params.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response.status;
      })
      .then((data: Post) => {
        setPost(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(
      "https://jsonplaceholder.typicode.com/posts/" + params.id + "/comments"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response.status;
      })
      .then((data: Comment[]) => {
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + params.id, {
      method: "DELETE",
    });
  };
  const editPost = () => {
    console.log(post);
    fetch("https://jsonplaceholder.typicode.com/posts/" + params.id, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <>
      <div className="comment-form">
        <h1>Post details</h1>
        <h2>Title:</h2>
        <Input.TextArea
          className="title-textarea"
          name="title"
          onChange={(e) => {
            setPost({ ...post, title: e.target.value });
          }}
          value={post.title}
        />
        <h2>Body:</h2>
        <Input.TextArea
          className="body-textarea"
          title="body"
          onChange={(e) => {
            setPost({ ...post, body: e.target.value });
          }}
          value={post.body}
        />
        <div className="comment-form-buttons">
          <Button onClick={editPost}>Edit</Button>
          <Button onClick={deletePost}>Delete</Button>
        </div>
      </div>
      <div className="comment-container">
        <h1 id="comment_title">Comments</h1>
        {comments ? (
          comments?.map((com: Comment) => (
            <div key={com.id} className="comment-container__card">
              <Card
                className="comment-container__card--content"
                title={com.name}
              >
                {com.body.length < 16
                  ? com.body
                  : `${com.body.substring(0, 15)}...`}
              </Card>
              <div className="comment-container__card--hide">{com.email}</div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
