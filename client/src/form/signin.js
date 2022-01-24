import React,{useState} from 'react';
import{useHistory,Link} from 'react-router-dom'
import './signin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Signin = ()=>
{
  localStorage.getItem('jw')
  
  

  const history=useHistory();
  const [usernameoremail,setEmail]=useState('');
  const [password,setPassword]=useState('');

  var body = {
    usernameoremail:usernameoremail,
    password: password,
}

const loginuser = async (e)=>
{
  e.preventDefault();
    const res = await axios.post(
      'http://localhost:5000/signin',
      body,
    )




  if(res.data==="No Account with this email or username")
  {
    toast.warn("No User with this email or username");
    return;
  }
  else if(res.data==="Wrong Password")
  {
    toast.warn("Invalid Password");
  }
  else
  {
    localStorage.setItem('jw',1);
    localStorage.setItem('token',res.data);
    localStorage.setItem('idtoken',res.data);
    const pos= {
      token:res.data,
    };
    const posi = await axios.post(
      'http://localhost:5000/user_pos',
      pos,
    );
    // alert(posi.data);
    if(posi.data==="Worker")
    {
      // alert(localStorage.getItem('token'));
      localStorage.setItem('jw',1);
      window.location.href='/worker/account';
    }
    else if(posi.data==="Customer")
    {
      // alert("Customer");
      localStorage.setItem('jw',2);
      window.location.href='/customer/account';
    }
  }


}

  return(
    <section className="signup">
    <div className="container mt-5 d-flex justify-content-center">
      <div className="signup-content d-flex justify-content-center jumbotron logincolor">
        <div className="signup-form">
        <h2 className="">Login</h2>
        <form method="POST">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
            value={usernameoremail}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div>
        <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <br></br>
        <input type="submit" class="btn btn-primary" value="Log In"
          onClick={loginuser}
        />
      </form>
        </div>
      </div>
      
      <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
             />
    </div>
  </section>
  )
}

export default Signin


