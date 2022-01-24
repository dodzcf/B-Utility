import React,{useEffect,useState} from 'react';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';
import './account.css';


const Customer= ()=>
{  const [userName,setUserName]=useState();
    const [userfname,setfname]=useState();
    const [userlname,setlname]=useState();
    const [userEmail,setemail]=useState();
    const [userPosition,setposition]=useState();
    const [restt=[],setRest]=useState();
    const [deleted,setDelete]=useState();
    const history=useHistory();
  

    const data = async ()=>
    {
      
      const token=localStorage.getItem("token");
        // alert(JSON.stringify(token));
      var body = {
        token:token,
    }
    
  
    try{
        
        const res = await axios.post(
          "http://localhost:5000/getData",
          body,
        )
        

      try{
   
      const userinfo=await res.data;
      setUserName(userinfo.username);
      setfname(userinfo.firstname);
      setlname(userinfo.lastname);
      setemail(userinfo.email);
      setposition(userinfo.position);
  
     
      
      }
    catch(error)
    {
    //   history.push("/signin");
    }
    }
    catch
    {
    //   history.push("/signin");
    }
    
  

    try{
        
      const rest = await axios.post(
        "http://localhost:5000/getPost",
        body,
      )
      
      
    try{

    const info=await rest.data;

    setRest(info);
    
 
    }
  catch(error)
  {
    alert("NO");
  }
  }
  catch
  {
  //   history.push("/signin");
  }
  
}

useEffect(()=>{
  data();
},[])

  const post=restt;

  const deletee = async (e)=>
    {
      e.preventDefault();
      alert(e.target.value);

      
      const token=localStorage.getItem("token");
      



      var id = {
        id:e.target.value,
        token:token,
    }

    localStorage.setItem("idtokenid",id.id);
    localStorage.setItem("idtokentoken",id.token);
    window.location.href='/worker/delete';
    }


    const changepost = async (e)=>
    {
      e.preventDefault();
      alert(e.target.value);

      
      const token=localStorage.getItem("token");
      



      var id = {
        id:e.target.value,
        token:token,
    }

    localStorage.setItem("idtokenid",id.id);
    localStorage.setItem("idtokentoken",id.token);
    history.push('/worker/editpost');
    }


    return (
        <>
        <div className="jumbotron d-flex justify-content-center midjj">
        <div className="container">
            <div className="jumbotron d-flex justify-content-center midjk">
            <div><h1>Welcome Customer</h1>
            
            <br></br>
            <h4>Username: {userName}</h4>
            <h4>First Name: {userfname}</h4>
            <h4>Last Name: {userlname}</h4>
            <h4>Email: {userEmail}</h4>
            <h4>Post: {userPosition}</h4>
            </div>
            <br></br>
            </div>
            </div>
            </div>



        </>
    )
}

export default Customer;