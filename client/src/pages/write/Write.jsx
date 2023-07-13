import "./write.css"
import Header from "../../components/header/Header"
import { useState } from "react"
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";


export default function Write() {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [summary, setSummary] = useState("");
    const [file, setFile] = useState(null)
    const {user} = useContext(Context)

    const handleSubmit= async(e) => {
        e.preventDefault();
        const newPost = {
            username:user.username,
            title,
            author,
            summary
        };
        if(file){
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file",file);
            newPost.photo = filename;
            try{
                await axios.post("/upload",data);

            } catch(err) {}
        }
        try{
           const res = await axios.post("/posts",newPost)
            window.location.replace("/post/" + res.data._id)
        } catch(err) {

        }
        
    };




  return (
    <>
    <Header/>
    <div className="write">
        <div className="writeTitle">Kitap Ekle + </div>
        <p className="writeInfo">Kitabınızın özetini yazarken, lütfen 5N 1K sorularını
            yanıtlayarak yazmaya özen gösteriniz..
        </p>

        <div className="writeFormBox">
        {file && (<img className="writeImg"
        src={URL.createObjectURL(file)}
        alt="" />)}
        
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon ">Resim EKLE + </i>
                   
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
               
            </div>
            <div className="writeBookTitle">
            <input type="text" placeholder="Kitabın Adı" className="writeInput"  autoFocus={true} onChange={e=>setTitle(e.target.value)}  />
            </div>

            <div className="writeBookAuthor">
            <input type="text" placeholder="Kitabın Yazarı" className="writeInput"   onChange={e=>setAuthor(e.target.value)} />
            </div>
            
            

            <div className="writeFormGroup">
                <textarea placeholder="Kitabın Özeti..." type="text" className="writeInput writeText"  onChange={e=>setSummary(e.target.value)} ></textarea>
            </div>

            <button className="writeSubmit" type="submit">
                Kaydet
            </button>
            
        </form>

        </div>
        </div>
    </>
  )
}
