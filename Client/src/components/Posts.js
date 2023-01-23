import Post from "./Post";
import "../css/posts.css"

export default function Posts({ posts }) {
  return (
    <div className="grid grid-col lg:grid-cols-3 gap-x-20 gap-y-10">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}

