import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      <div className="postsTitle" style={{ textAlign: "center" }}>
        Okuduğum Kitaplar
      </div>

      <div className="postTitle" style={{ textAlign: "center" }}>
        {posts && posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p className="postsTitle" style={{ textAlign: "center" }}>Henüz Kitap Eklememişsiniz </p>
        )}
      </div>
    </div>
  );
}
