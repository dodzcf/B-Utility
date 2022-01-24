import React,{useEffect,useState} from 'react';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';
import './feed.css';


const Feed= ()=>
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
          "http://localhost:5000/text",
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
        "http://localhost:5000/getFeed2",
      )
      
      
    try{

    const info=await rest.data;
    alert(info);
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

    try{
        
        const rest = await axios.post(
          "http://localhost:5000/text",
          id
        )
    }
    catch(error)
    {
        
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



            <div className="jumbotron offer1">
            <div>
            <h1 className="d-flex justify-content-center"><u>OFFERS</u></h1>
            <br></br>
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
            </div>
        </>
    )
}

export default Feed;