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
  
  }
  const handleUsername=(e)=>{
    setsignupDetails({...signupDetails,name:e.target.value});
  
  }
  const handleSubmit=(e)=>{
    console.log(signupDetails);
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
          // Registration was successful
          return response.json();
      } else {
      
          // Registration failed, handle the error
          if(response.status==403){
            throw new Error("Registration failed! User is already registered");
          }else{
            throw new Error("Registration failed");
          }
      }
  })
  .then(data => {
      // Handle the response data if needed
      if(data.status=='success'){
        // alert("successfully registered");
        handleClickOpen();
      }
      // console.log('Registration response:', data);
    })
    .catch(error => {
    
      alert(error);
  });
  
  }
  const [open, setOpen] = React.useState(false);

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
    <form className="form">
        <h3>Signup Here</h3>

        <label htmlFor="username">Username <span className="req">*</span></label>
        <input type="text" placeholder="jhon pele" onChange={handleUsername} id="username"required/>

        <label htmlFor="email">Email <span className="req">*</span></label>
        <input type="email" placeholder="jhony@123.com " onChange={handleEmail} id="email" required/>

        <label htmlFor="password">Password <span className="req">*</span></label>
        <input type="password" placeholder="Password" onChange={handlePassword} id="password"required/>

        <button type="submit" onClick={handleSubmit}>Sign up</button>
        <div className="social">
        <span>already have an account ?</span>
          <div className="fb"onClick={()=>{navigate('/login')}}>Login</div>
        </div>
    </form>

    {/* ================================================= */}
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
          Successfully resistered. Login for enjoy YouTube music advanced facilities.
          </Typography>
        
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Login page
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>

    
    {/* ================================================= */}

  </>
}
export default SignUp;