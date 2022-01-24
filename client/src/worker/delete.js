import React,{useEffect,useState} from 'react';
import{useHistory,Link} from 'react-router-dom';
import axios from 'axios';

const Delete=()=>
{

    const history=useHistory();
    const [location,setLocation]=useState('');
    const [message,setMessage]=useState('');
  
    var body = {
      location:location,
      message:message,
  }

  const loginuser = async ()=>
  {
    // e.preventDefault();
  
    const id=localStorage.getItem("idtokenid");
    const token=localStorage.getItem("idtokentoken");

    var idd = {
      id:id,
      token:token,
  }



      const res = await axios.post(
        "http://localhost:5000/deleteMessage",
        idd,
      );
      if(res.status===200)
      {
        history.push('/worker/account');
      }

      // alert("Hey");
      
        
}

useEffect(()=>{
  loginuser();
},[])


    return (
        <>
                Deleting...
        </>
    )
}

export default Delete;