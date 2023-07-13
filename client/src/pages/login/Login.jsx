import "./login.css"
import Header from "../../components/header/Header"
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios"
import { Link } from "react-router-dom";



export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context); //isFetching

  const handleSubmit =async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password:passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data});

    }catch(err){
      dispatch({type:"LOGIN_FAILURE"});
    }
  };





  return (
    <>
    <Header/>
    <div className="login">
        <span className="loginTitle">Giriş</span>
        <form  className="loginForm" onSubmit={handleSubmit}>
            <label className="loginLabel">Kullanıcı Adı</label>
            <input 
            type="text" 
            className="loginInput" 
            placeholder="Kullanıcı Adınızı Girin"
            ref={userRef}
        />

            <label className="loginLabel">Şifre</label>
            <input 
            type="password" 
            className="loginInput" 
            placeholder="Şifrenizi Girin"
            ref={passwordRef}
         />
        
        <div className="loginButtons">
            <button className="loginButton" type="submit" disabled={isFetching} >Giriş</button>
            
       
            <button className="loginRegisterButton">
              <Link className="link" to="/register">Kayıt</Link></button>
        
      
          
        
              </div>
          
        </form>

        
        
    </div>
 
    </>
  )
}
