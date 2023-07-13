import "./settings.css"
import Header from "../../components/header/Header"
import { useState } from "react"
import { useContext } from "react"
import {Context} from "../../context/Context"
import axios from "axios"

export default function Settings() {
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)

  const {user , dispatch} = useContext(Context)
  const PF = "http://localhost:5000/images/"

  const handleSubmit= async(e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
        userId:user._id,
        username,email,password,
    };
    if(file){
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file",file);
        updatedUser.profilePic = filename;
        try{
            await axios.post("/upload",data);
            

        } catch(err) {}
    }
    try{
      const res=  await axios.put("/users/" + user._id, updatedUser)
       setSuccess(true);
       dispatch({type:"UPDATE_SUCCESS", payload:res.data})

    } catch(err) {
      dispatch({type:"UPDATE_FAILURE"})
    }
    
};

  return (
    <>
    <Header/>
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">
                Bilgilerini Güncelle
            </span>
           
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
           
            <div className="settingsPP">
                <img 
                src={file ? URL.createObjectURL(file) : PF+ user.profilePic}
                alt="" 
                />
                <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
            <label className="settingsLabel">Kullanıcı Adı</label>
            <input type="text" placeholder={user.username}  onChange={(e)=>setUsername(e.target.value)} />
            <label className="settingsLabel">Email</label>
            <input type="email" placeholder={user.email}  onChange={(e)=>setEmail(e.target.value)}/>
            <label className="settingsLabel">Şifre</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} />
            <button className="settingsSubmit" type="submit">Güncelle</button>
            {success && <span style={{color:"green", textAlign:"center", marginTop:"20px"}}>Profiliniz Güncellendi..</span>}
            <span className="settingsDeleteTitle">
                Hesabı Sil
            </span>
        </form>
      </div>
    </div>
    </>
  )
}