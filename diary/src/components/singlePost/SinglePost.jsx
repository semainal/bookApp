import "./singlePost.css"
import { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom"
import { Context } from "../../context/Context";
import axios from "axios";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [summary, setSummary] = useState("");
    const [update, setUpdate] = useState(false);



    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data)
            setTitle(res.data.title);
            setAuthor(res.data.author);
            setSummary(res.data.summary);
        };
        getPost();
    }, [path]);






    const handleDelete = async () => {
        try{
            await axios.delete(`/posts/${post._id}`, {
                data: {username: user.username}
            })
            window.location.replace("/")
           
    } catch(err){
        
       
    }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username, title, author, summary
            })

            setUpdate(false)
        } catch(err) {

        }
    }



  return (
    <>
     <div className='singlePost'>
 
 <div className="col">
   <div class="card h-100 postCol">
   {post.photo && (
    <img src={PF + post.photo}
    alt=""
    className="singlePostImg" />
   )}
        
          
     <div class="card-body">
    
      {update ? <input type="text" value={title} 
      className="singlePostTitleInput" 
      autoFocus 
      onChange={(e) => setTitle(e.target.value)}/>:
          (<h6 className="singlePostTitle">
                {title}
                </h6>)}


      {update ? <input type="text" value={author} 
      className="singlePostAuthorInput" 
      autoFocus 
      onChange={(e) => setAuthor(e.target.value)}/>:
          (<h6 className="singlePostAuthor">
                {author}
                </h6>)}  

      {update ? <textarea type="text" value={summary} 
      className="singlePostTextInput" 
      autoFocus 
      onChange={(e) => setSummary(e.target.value)}/>:
          (<h6 className="singlePostText">
                {summary}
                </h6>)}       
      

     </div>

     <div className="cardButtons">
        <button className="cardButton" onClick={() => setUpdate(true)}>Güncelle</button>
        <button className="cardButton" onClick={handleDelete}>Sil</button>


        <button className="cardButton" onClick={handleUpdate}>Kaydet</button>
     </div>
     <div className="card-footer">
             <small className="text-body-success">{new Date(post.createdAt).toDateString()} </small>
           </div>

 </div>
 </div>
 </div>
 </>)}
