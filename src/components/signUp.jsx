import { TextField } from "@mui/material";
import '../styles/form.css'
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Alert from './alert';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const SignUp = () => {
    const [signupDetails,setsignupDetails]=useState({name:"",email:"",password:"", appType:"music"});
    const[formErr,setFormErr]=useState({usernameErr:"",passErr:"",alertErr:""});
    const[res,setRes]=useState();


 const url="https://academics.newtonschool.co/api/v1/user/signup";
 const headers = {
    'projectId': 'yda0liol0ofu',
  };
  const method="POST"
  const body=JSON.stringify({...signupDetails})

  const navigate=useNavigate();


  const handleEmail=(e)=>{
    setsignupDetails({...signupDetails,email:e.target.value});
  
  }
  const handlePassword=(e)=>{
    setsignupDetails({...signupDetails,password:e.target.value});
    if(e.target.value.length<6 && e.target.value.length>0){
      setFormErr({...formErr,passErr:"Password must be at least 6 characters"})
    }else{
      setFormErr({...formErr,passErr:""})
    }
  
  }
  const handleUsername=(e)=>{
    const temp=e.target.value;
    function isUsernameValid(a) {
      var pattern = /^[a-zA-Z0-9_]+$/; 
      return pattern.test(a);
    };
    
    if(!isUsernameValid(temp)&& temp.length >0){
      setFormErr({...formErr,usernameErr:"username should't contain symbol"})
    }else{
      setFormErr({...formErr,usernameErr:""})
    }

    setsignupDetails({...signupDetails,name:e.target.value});
  
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    fetch('https://academics.newtonschool.co/api/v1/user/signup', {
      method: 'POST',
      headers: {
        'projectId': 'yda0liol0ofu',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         ...signupDetails
      })
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
       console.log(response)
          if(response.status==403){
            throw new Error("Registration failed! User has already registered");
          }else if(response.status==400){
            throw new Error("Registration failed! Enter valid email address and password");
          }else{
            throw new Error("Registration failed! Error...");
          }
      }
  })
  .then(data => {
      if(data.status=='success'){
        handleClickOpen();
        setTimeout(()=>{
          handleClose();

        },2000)
      }
  
    })
    .catch(error => {
      setOpen2(true);
      setTimeout(()=>{
        setOpen2(false)
      },2000)
      setFormErr({...formErr,alertErr:error.message});
  });
  
  }
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    navigate('/login');
    setOpen(false);
  };

  return <>

   <Button className="back2" onClick={()=>{navigate('/')}} variant="outlined" startIcon={<KeyboardDoubleArrowLeftIcon />}>
Home
</Button>
 <div className="background2">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form className="form" onSubmit={handleSubmit}>
        <h3>Signup Here</h3>

        <label htmlFor="username">Username <span className="req">*</span></label>
        <input type="text" placeholder="Shubham shukla" onChange={handleUsername} id="username"required/>
        {<span style={{color:'red'}}>{formErr.usernameErr}</span>}

        <label htmlFor="email">Email <span className="req">*</span></label>
        <input type="email" placeholder="jhony@123.com " onChange={handleEmail} id="email" required/>

        <label htmlFor="password">Password <span className="req">*</span></label>
        <input type="password" placeholder="Password" onChange={handlePassword} id="password"required/>
        {<span style={{color:'red'}}>{formErr.passErr}</span>}

        <button type="submit"  disabled={formErr.passErr.length>0 || formErr.usernameErr.length>0 ? "disabled" : false} >Sign up</button>
        <div className="social">
        <span>already have an account ?</span>
          <div className="fb"onClick={()=>{navigate('/login')}}>Login</div>
        </div>
    </form>

    <div>
     
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Successfully Registered
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
          Successfully resistered.😊 Login for enjoy YouTube music advanced facilities.
          </Typography>
        
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </BootstrapDialog>
    </div>

{open2 ?     <Alert status={"fail"} text={`${formErr.alertErr}`}/>:null}

  </>
}
export default SignUp;