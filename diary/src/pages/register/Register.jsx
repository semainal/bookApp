import "./register.css"
import Header from "../../components/header/Header"
import { useState } from "react"
import axios from "axios"


export default function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try{
      const res = await axios.post("/auth/register", {
        username,
        email,
        password

      });

      res.data && window.location.replace("/login");
    }catch(err) {

      setError(true);
    }
  }



  return (
    <>
    <Header/>

    <div className="register">
    
        <span className="registerTitle">Kayıt</span>
        <form  className="registerForm" onSubmit= {handleSubmit}>
        <label className="registerLabel">Kullanıcı Adı</label>
            <input 
            type="text" 
            className="registerInput" 
            placeholder="Enter your username" 
            onChange={(e) => setUsername(e.target.value)}
            />
            
            <label className="registerLabel">Email</label>
            <input 
            type="text" 
            className="registerInput" 
            placeholder="Enter your email" 
            onChange={(e) => setEmail(e.target.value)}
            />

            <label className="registerLabel">Password</label>
            <input 
            type="password" 
            className="registerInput" 
            placeholder="Enter your password" 
            onChange={(e) => setPassword(e.target.value)}
            />
        
        <div className="registerButtons">
        <button className="registerButton" type="submit">Kayıt</button>
        <div className="errorSpan">
            {error && <span>Lütfen tekrar deneyiniz..</span>}
            </div>

       
           
        </div>

        
        
        </form>
        

    </div>
   
    </>
  )
}
