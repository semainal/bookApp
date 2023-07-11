import Home from "./pages/home/Home.jsx"
import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register";
import Write from "./pages/write/Write.jsx"
import Settings from "./pages/settings/Settings.jsx"
import Single from "./pages/single/Single.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Context } from "./context/Context";
import { useContext } from "react";
import List from "./pages/bookList/List.jsx";





function App() {
  const {user }= useContext(Context);
  return (
    <>
    <Router>
      <Topbar/>
      <Switch>
        <Route exact path="/">
        {user ? <Home/> : <Login/>}
        </Route>

        <Route path="/register">
        {user ? <Home/> : <Register/>}
        </Route>

        <Route path="/login">
        {user ? <Home/> : <Login/>}
        </Route>

        <Route path="/addBook">
        {user ? <Write/> : <Register/>}
        </Route>

        <Route path="/list">
        {user ? <List/> : <Register/>}
        </Route>

   

        <Route path="/settings">
        {user ? <Settings/> : <Register/>}
        </Route>

        <Route path="/post/:postId">
        {user ? <Single/> : <Register/>}
        </Route>

      </Switch>
    </Router>

    </>
  );
}

export default App;
