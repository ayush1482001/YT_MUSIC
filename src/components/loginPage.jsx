import * as React from 'react';
import { TextField } from "@mui/material";
import '../styles/form.css'
import { useState } from "react";
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useDispatch } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Login = () => {
  const [loginDetails,setLoginDetails]=useState({email:"",password:""});
  const [response,setResponse]=useState(null);
  const navigate=useNavigate();
  const url='https://academics.newtonschool.co/api/v1/user/login';

  const method='POST';
  const headers = {
    'projectId': 'yda0liol0ofu',
    'Content-Type': 'application/json'
  };
  const body=JSON.stringify({
    "email": "ayu@123mn.com",
    "password": "7599",
    "appType": "music"
})

const[isLoggedIn,setIsLoggedIn]=useState(true);

const dispatch=useDispatch();
const LoginStatus={
  type:"isLoggedin",
  payload: response,
};
dispatch(LoginStatus);
  
 
const handleEmail=(e)=>{
  setLoginDetails({...loginDetails,email:e.target.value});

}
const handlePassword=(e)=>{
  setLoginDetails({...loginDetails,password:e.target.value});

}
const handleSubmit=(e)=>{
  e.preventDefault();

  const fetchData = async () => {
    const response = await fetch(url, {method,headers,body});
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.statusText);
    }
  };
  fetchData().then((d) => {
      setResponse(d);
      setOpen(true);
      localStorage.setItem("loginStatus",JSON.stringify(d));
    });
    console.log("response is",response)
  }
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    navigate('/');
};
  return <>
  
  <Button className="back2" onClick={()=>{navigate('/')}} variant="outlined" startIcon={<KeyboardDoubleArrowLeftIcon />}>
Home
</Button>
 <div className="background2">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form className="form"> 
        <h3>Login Here</h3>

        <label htmlFor="username">Email <span className="req">*</span></label>
        <input type="email" placeholder="Email" id="username"
         onChange={handleEmail}/>

        <label htmlFor="password">Password <span className="req">*</span></label>
        <input onChange={handlePassword} type="password" placeholder="Password" id="password"required/>

        <button type="submit" onClick={handleSubmit}>Log In</button>
        <div className="social">
        <span>dont't have account ?</span>
          <div className="fb" onClick={()=>{navigate('/signup')}}>Sign up</div>
        </div>
    </form>
    <div>
     
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Successfully logged in...😁"}
        </DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='success' autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  </>
}
export default Login;