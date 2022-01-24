import React,{useState} from 'react';
import{useHistory,Link} from 'react-router-dom';
import axios from 'axios';

const NewPost=()=>
{

    const history=useHistory();
    const [location,setLocation]=useState('');
    const [message,setMessage]=useState('');
    const token=localStorage.getItem("token");
    
    var body = {
      token:token,
      location:location,
      message:message,
  }

  const loginuser = async (e)=>
  {
    e.preventDefault();
  
    

      const res = await axios.post(
        "http://localhost:5000/addPost",
        body,
      );
      if(res.data==="Success")
      {
        window.location.href='/worker/account';
      }

      // alert("Hey");
      
        
}




    return (
        <>
                    <div className="jumbotron">
                    <form>
                    <div class="form-group">
                        <input type="name" class="form-control" id="Location" aria-describedby="emailHelp" placeholder="Enter Location where you will provide service"
                        value={location}
                        onChange={(e)=>setLocation(e.target.value)}
                         />
                    </div>
                    <div class="form-group">
                        <textarea type="message" class="form-control" id="message" placeholder="Enter the service that you will provide"
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        />
                    </div>
                    <button type="submit" class="btn btn-primary " onClick={loginuser}>Add</button>
                    </form>
                    </div>
        </>
    )
}

export default NewPost;