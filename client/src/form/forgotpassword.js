import React,{useState} from 'react';
import{useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ForgotPassword = ()=>
{
  localStorage.getItem('jw')
  
  const history=useHistory();
  const [usernameoremail,setEmail]=useState('');

 

const loginuser = async (e)=>
{
  e.preventDefault();

  var body = {
    usernameoremail:usernameoremail,
}

  const res=await axios.post(
    "http://localhost:5000/forgotpassword",
    body,
  );


  if(res.data==="No account")
  {
    toast.warn("No User with this email");
  }
  if(res.data==="No account")
  {
    toast.warn("No User with this username");
  }
  if(res.data==="Password Request Sent")
  {
    toast.success("Reset link has been sent to your email address");
    
  }


}

  return(
    <section className="signup">
    <div className="container mt-5 d-flex justify-content-center">
      <div className="signup-content jumbotron">
        <div className="signup-form">
        <h2>Password Change</h2>
        <form method="POST">
        <div class="form-group">
          <br></br>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email or username"
            value={usernameoremail}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <br></br>
        <input type="submit" class="btn btn-primary" value="Send"
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

export default ForgotPassword


