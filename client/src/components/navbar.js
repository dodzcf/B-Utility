import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar=()=>
{
    var naving=localStorage.getItem('jw');


    const RenderMenu=()=>
    {
    
      if(naving==1){
        
        return(
          <>
        <li class="nav-item">
          <Link class="nav-link " to="/worker/workerhome" >Home</Link>
        </li>
          <li class="nav-item">
          <Link class="nav-link" to="/worker/account">Account</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/logout">Log Out</Link>
        </li> 
          </>
    
        )
      }
      
      else if(naving==2){
        
        return(
          <>
          <li class="nav-item">
          <NavLink class="nav-link " to="/" >Home</NavLink>
        </li>
          <li class="nav-item">
          <Link class="nav-link" to="/customer/feed">Feed</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/customer/account">Account</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/logout">Log Out</Link>
        </li>
          </>
    
        )
      }
    
  else{
    return(
      <>
      <li class="nav-item">
          <NavLink class="nav-link" to="/" >Home</NavLink>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/signup">Sign up</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/signin">Log In</Link>
        </li>
      </>
    )
  
    }
  }
    return(
      <>
      
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <h1 className="logop">B-Utility</h1>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav">
      <RenderMenu/>
      </ul>
    </div>
  </nav>
  </>
    )
  
  
}

export default Navbar;