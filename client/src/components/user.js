import React from 'react';
import './user.css';
import { Link,NavLink ,useHistory} from 'react-router-dom';


const User=()=>
{
  const history=useHistory();
  const signin=()=>
  {
      history.push('/signin');
  }
    return(
    <>
    <div className="jumbotron d-flex justify-content-center usercolor">
    <div className="card-columns d-flex justify-content-center">
    <div className="card bg-secondary">
      <div className="card-body text-center">
      <i className="fas fa-user-hard-hat customer"></i>
      <br></br>
      <br></br>
        <p className="card-text">Are you a Customer ?</p>
        <br></br>
        <Link><button className="btn btn-primary" onClick={signin}>Call for help</button></Link>
      </div>
    </div>
    &nbsp;
    <div className="card bg-secondary">
      <div className="card-body text-center">
      <i className="fas fa-user customer"></i>
      <br></br>
      <br></br>
        <p class="card-text">Are you a Repair Person?</p>
        <Link><button className="btn btn-primary" onClick={signin}>Help</button></Link>
      </div>
    </div>
    </div>
    </div> 
    </>
    )
}

export default User;