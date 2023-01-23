import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Post } from "../../models/post";

export interface IPostProps {
  post: Post;
}

export function SinglePost(props: IPostProps) {
  const navigate = useNavigate();
  function onClick() {
    navigate(`/posts/${props.post.id}/comment`);
  }
  return (
    <Card onClick={onClick}>
      <div style={{ fontSize: 20, cursor: "pointer" }}>{props.post.title}</div>
      {props.post.body}
    </Card>
  );
}
