import { Posts } from "./Posts";

export interface INewsletterProps {}

export function Newsletter(props: INewsletterProps) {
  return (
    <div>
      <h1>Posts:</h1>
      <Posts />
    </div>
  );
}
