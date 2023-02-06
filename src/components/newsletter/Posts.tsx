import * as React from "react";
import { Post } from "../../models/post";
import { SinglePost } from "./Post";

export interface IPostsProps {}

export function Posts(props: IPostsProps) {
  const [posts, setPosts] = React.useState<Post[]>([]);
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response.status;
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="post-container">
      <h1 id="post_title">Posts</h1>

      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}
