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
    <Card
      onClick={onClick}
      className="post-container__card"
      title={props.post.title}
    >
      {props.post.body}
    </Card>
  );
}
