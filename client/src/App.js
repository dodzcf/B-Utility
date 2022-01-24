import './App.css';
import Navbar from './components/navbar.js';
import Introduction from './components/Introduction.js';
import User from './components/user.js';
import Signup from './form/signup.js';
import Signin from './form/signin.js';
import ForgotPassword from './form/forgotpassword.js';
import Logout from './form/logout';
import Workerhome from './worker/workerhome.js';
import Worker from './worker/account';
import NewPost from './worker/newpost';
import Customer from './customer/account';
import Feed from './customer/feed';
import Delete from './worker/delete';
import EditPost from './worker/edit';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <>
    <Navbar/>
    <Route exact path='/'>
    <Introduction/>
    <User/>
    </Route>
    <Route exact path='/signup'>
      <Signup/>
    </Route>
    <Route exact path='/signin'>
      <Signin/>
    </Route>
    <Route exact path='/forgotpassword'>
      <ForgotPassword/>
    </Route>
    <Route exact path='/logout'>
      <Logout/>
    </Route>
    <Route exact path='/worker/account'>
      <Worker/>
    </Route>
    <Route exact path='/customer/account'>
      <Customer/>
    </Route>
    <Route exact path='/worker/newpost'>
      <NewPost/>
    </Route>
    <Route exact path='/worker/delete'>
      <Delete/>
    </Route>
    <Route exact path='/worker/editpost'>
      <EditPost/>
    </Route>
    <Route exact path='/worker/workerhome'>
      <Workerhome/>
    </Route>
    <Route exact path='/customer/feed'>
      <Feed/>
    </Route>
    </>
  );
}

export default App;
