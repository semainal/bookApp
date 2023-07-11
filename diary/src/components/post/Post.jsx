import "./post.css"

import { Link } from "react-router-dom";


export default function Post({post}) {

  
  const PF = "http://localhost:5000/images/";
  return (
    <>
    <div className='post'>
 
    <div className="row" >
    
  <div className="col">
    <div class="card h-100 postCol">
    <Link className="link" to={`/post/${post._id}`}>
      {post.photo && (
      <img src={PF + post.photo} 
      className="postImg" 
      alt="..."/>)}
      </Link>
      <div class="card-body">
        <Link className="link" to={`/post/${post._id}`}>
        <h4 class="card-title">{post.title}</h4>
        </Link>
        
        <h5 className="card-author">{post.author}</h5>
        <p class="card-text">{post.summary} </p>
      </div>
      <div className="card-footer">
              <small className="text-body-success">{new Date(post.createdAt).toDateString()} </small>
            </div>
            
  </div>

  </div>
 

 
  </div>

  </div>





 


</>
  )
}
