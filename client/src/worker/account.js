import React,{useEffect,useState} from 'react';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';
import './workeraccount.css';


const Worker = ()=>
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
      // try{
      //   var id = {
      //     id:e.target.value,
      //     token:token,
      // }

        
      //   const rest = await axios.post(
      //     "http://localhost:5000/deleteMessage",
      //     id,
      //   )
      // }
      // catch(error)
      // {

      // }
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
        <div className="jumbotron d-flex justify-content-center">
        <div className="container">
            <div className="jumbotron d-flex justify-content-center midj">
            <div><h1>Welcome Worker</h1>
            
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


            <div className="jumbotron">
            <div>
            <h1 className="d-flex justify-content-center"><u>OFFERS</u></h1>
            <br></br>
            {/* <Link to="/worker/newpost"></Link> */}

            {post.map((posts)=>{
                return (
                    <>
                           
                            <br></br>
                            <div class="row">
                        <div class="col-lg-12">
                          <div class="card">
                            <div class="card-body">
                            <div className="here"><h3>Location:</h3> <div class="p-3 mb-2 bg-secondary text-white d-flex justify-content-center messages"> <h4>{posts.location}</h4></div> <br></br><br></br> <h3>Service:</h3>  <div class="p-3 mb-2 bg-secondary text-white messages d-flex justify-content-center">{posts.message}</div> <br></br> </div>
                            <br></br>
                            <div className="d-flex justify-content-center">
                            <Link ><button type="button" className="btn btn-danger btn-circle btn-xl" onClick={deletee} value={posts._id} ><i class="fa fa-trash-alt"></i></button></Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="/worker/editpost"><button type="button" onClick={changepost} value={posts._id} className="btn btn-info btn-circle btn-xl" ><i class="fa fa-edit"></i></button></Link>
                            </div>
                            </div>
                          </div>
                        </div>
                        <br></br>
                        
                      </div>
                      
                    </>
                    )
            })}
            </div>
            <br></br>
              <div className="d-flex justify-content-center">
                  <Link to="/worker/newpost"><button type="button" className="btn btn-success btn-circle btn-xl" ><i class="fa fa-plus"></i></button></Link>
              </div>
            </div>
        </>
    )
}

export default Worker;