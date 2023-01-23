import { Link } from "react-router-dom";
import "../css/post.css";


export default function Post({ post }) {
  const PF ="http://localhost:3000/public/images/";
  return (
    <div className="flex flex-col">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="flex flex-col items-center gap-y-1">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/blog/${post._id}`} className="link">
          <span className="font-bold text-2xl ">{post.title}</span>
        </Link>
        <hr />
        <span className=" text-xs italic">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className=" text-center mt-5 truncate text-ellipsis text-[#455255] ">{post.desc}</p>
    </div>
  );
}