import { useContext } from "react";
import "./topbar.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";




export default function Topbar() {
const {user, dispatch} = useContext(Context)
const PF = "http://localhost:5000/images/"

const handleLogout = () => {
  dispatch({type: "LOGOUT"})
}

  return (
    <div className="topbar">

<Navbar  expand="lg" className="topList">
      <Container fluid>
        <Navbar.Brand className="topIcon">
          <Link className="link" to="/">
          <i className="fa-solid fa-book topIcon"></i>
          </Link>
          </Navbar.Brand>
          <Nav.Link className="topList">
              <Link className="link topList" to="/">KİTAP GÜNLÜĞÜM</Link>
            
            </Nav.Link>

            
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
         
          <Nav
            className="me-auto my-2 my-lg-0 topLeft "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
            
           
            
          </Nav>

          <Nav
            className="me-auto my-2 my-lg-0 topLeft "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          

            <Nav.Link className="topList" >
              <Link className="link topList" to="/addBook" >Kitap Ekle +</Link>

              </Nav.Link>
              <Nav.Link className="topList" >
              <Link className="link topList" to="/list" >Okumak İstediğim Kitaplar</Link>

              </Nav.Link>
           
            
          </Nav>
      
          
          <Form className="d-flex">
          <Nav.Link className="topRight">
            
         {user ? (
          <Link to="/settings">
          <img className="topImg" 
          src={PF + user.profilePic}
        alt="" />
          </Link>
         ): (

          <ul className="topList">
              <li className="topListItem topLogin">
                <Link className="link topLogin" to="/login">GİRİŞ</Link>
              
              </li>
            
              <li className="topListItem topRegister">
                <Link className="link topRegister" to="/register">KAYIT</Link>
            
              </li>
            </ul>
         )}
            

            
 

        
            
            <li className="link topList topUser" onClick={handleLogout} >{user && "ÇIKIŞ"}</li>
           
          </Nav.Link>
         
          
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 topBarSearch"
              aria-label="Search"
             
            />


            <Button className="topBarButton">Ara</Button>
           
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
  )
}
