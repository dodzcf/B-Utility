import React,{useState,useMemo} from 'react';
import{useHistory,Link} from 'react-router-dom'
import './signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import countryList from 'react-select-country-list';
import Select from 'react-select';


const Signup=()=>
{
    localStorage.getItem('user')
  
  

    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCPassword]=useState('');
    const [username,setUsername]=useState('');
    const [firstname,setFirstName]=useState('');
    const [lastname,setLastName]=useState('');

    //////ADDRESS//////
    const [country,setCountry]=useState('');
    const options = useMemo(() => countryList().getData(), []);
    const changeHandler = value => {
      setCountry(value)
    };
    const [city,setCity]=useState('');
    const [area,setArea]=useState('');
    const [postalcode,setPostalCode]=useState('');

    /////WORKER OR CUSTOMER///////////
    const [positions,setPosition]=useState('');
    const position = [
      { value: 'Worker', label: 'Worker' },
      { value: 'Customer', label: 'Customer' },
    ];
    const changePosition = value => {
      setPosition(value)
    };
    var body = {
      ////////PERSONAL INFORMATION////////////////
      username:username,
      password: password,
      cpassword:cpassword,
      email:email,
      username:username,
      firstname:firstname,
      lastname:lastname,

      //////////////ADDRESS////////////
      country:country.label,
      city:city,
      area:area,
      postalcode:postalcode,
    ///////POSITION////////
    positions:positions.label
      
      
  }
  // var span_Text = document.getElementById("span_Id").innerText;

  // alert(span_Text)
  
  const loginuser = async (e)=>
  {
    e.preventDefault();
  
      
  
      document.getElementById("emaill").innerHTML="";
      document.getElementById("usernamee").innerHTML="";
      document.getElementById("passwordd").innerHTML="";
      document.getElementById("cpassword").innerHTML="";
      document.getElementById("countryy").innerHTML="";
      document.getElementById("cityy").innerHTML="";
      document.getElementById("areaa").innerHTML="";
      document.getElementById("postalcodee").innerHTML="";
      document.getElementById("positionn").innerHTML="";
      document.getElementById("firstnamee").innerHTML="";
      document.getElementById("lastnamee").innerHTML="";


      
  
  
  
    if(!username)
    {
      document.getElementById("usernamee").innerHTML="Please enter username";
      return;
    }
    else if(!firstname)
    {
      document.getElementById("firstnamee").innerHTML="Enter First Name";
      return;
    }
    else if(!lastname)
    {
      document.getElementById("lastnamee").innerHTML="Please Enter Last Name";
      return;
    }
    else if(!email)
    {
      document.getElementById("emaill").innerHTML="Please Enter Email";
      return;
    }
    else if(!password)
    {
      document.getElementById("passwordd").innerHTML="Please Enter Password";
      return;
    }
    else if(password.length<7)
    {
      document.getElementById("passwordd").innerHTML="Please Enter Password greater than 7";
      return;
    }
    else if(!cpassword)
    {
      document.getElementById("cpassword").innerHTML="Please Enter Password Again to Confirm";
      return;
    }
    else if(password!==cpassword)
    {
      document.getElementById("cpassword").innerHTML="Passwords do not match";
      return;
    }
    else if(!country)
    {
      document.getElementById("countryy").innerHTML="Please Choose a Country";
      return;
    }
    else if(!city)
    {
      document.getElementById("cityy").innerHTML="Please Enter a City";
      return;
    }
    else if(!area)
    {
      document.getElementById("areaa").innerHTML="Please Enter your Address";
      return;
    }
    else if(!postalcode)
    {
      document.getElementById("postalcodee").innerHTML="Please Enter your Postal Code";
      return;
    }
    else if(!position)
    {
      document.getElementById("positionn").innerHTML="Please Choose your if you are a Customer or a Repair Person";
      return;
    }
    else
    {
      try{
      const res = await axios.post(
        "http://localhost:5000/signup",
        body,
      );
      if(res.data==='User with this username already exists')
      {
        document.getElementById("usernamee").innerHTML="This username is already registered";
      }
      else if(res.data==="User with this Email already exists")
      {
        document.getElementById("emaill").innerHTML="This email is already registered";
      }
    else{
      localStorage.setItem('user',0);
      localStorage.setItem('token',res.data);
      console.log(JSON.stringify(localStorage.getItem('id')));
      history.push("/signin");
    }
  }
  catch{
    alert("sorry");
  }
  }
  
  
  
  }
    return (
        <>

        <div className="wrapper">
            <div className="jumbotron jlogin">
            <div className="container">
              
                <form method="POST">
                <h2 className=" d-flex justify-content-center">Register Your Account</h2>
                <br></br>
                <h4 ><u>Personal Information:</u></h4>
                <br></br>
                    <div className="form-group">
                       <input type="name" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control required" placeholder="Enter Username" required />
                       <span id="usernamee"></span>
                    </div>
                    <div class="input-group">
                        <input type="name" value={firstname} onChange={(e)=>setFirstName(e.target.value)} className="form-control required" placeholder="Enter First Name" required/>
                           &nbsp;
                        <span class="input-group-addon"> </span>
                        <input type="name" value={lastname} onChange={(e)=>setLastName(e.target.value)} className="form-control required" placeholder="Enter Last Name" required/>
                    </div>
                        <span id="firstnamee"></span>
                        <span id="lastnamee"></span>
                        <br></br>
                    <div className="form-group">
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control required" placeholder="Enter Email" required/>
                        <span id="emaill"></span>
                    </div>
                    <div className="form-group">
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control required" placeholder="Enter Password" required/>
                        <span id="passwordd"></span>
                    </div>
                    <div className="form-group">
                        <input type="password" value={cpassword} onChange={(e)=>setCPassword(e.target.value)} className="form-control required" placeholder="Confirm Password" required/>
                        <span id="cpassword"></span>
                    </div>
                    
                    <br></br>


                    {/* /////////////ADDRESS//////////////// */}

                    <h4><u>Address:</u></h4>

                    
                    <Select options={options} value={country} onChange={changeHandler} />
                    <span id="countryy"></span>
                    <br></br>
                   <div className="form-group">
                       <input type="name" value={city} onChange={(e)=>setCity(e.target.value)} className="form-control required" placeholder="Enter City" required />
                       <span id="cityy"></span>
                    </div>
                    <br></br>
                    <div className="form-group">
                       <input type="name" value={area} onChange={(e)=>setArea(e.target.value)} className="form-control required" placeholder="Enter Your Complete Address" required />
                       <span id="areaa"></span>
                    </div>
                    <br></br>
                    <div className="form-group">
                       <input type="name" value={postalcode} onChange={(e)=>setPostalCode(e.target.value)} className="form-control required" placeholder="Enter Postal Code" required />
                       <span id="postalcodee"></span>
                    </div>
                    <br></br>
                    <Select options={position} value={positions} onChange={changePosition} />
                    <span id="positionn"></span>
                    <br></br>
                    <div className="form-group">
                    <input type="submit" class="btn btn-primary" value="Sign Up"
                    onClick={loginuser}
                  />                    
                  
        </div>
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


        </>
    )
}

export default Signup;