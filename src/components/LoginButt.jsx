import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router";
import IconButton from '@mui/material/IconButton';
import Alerttext from "./alert";

const LoginButt = (prop) => {
    const navigate=useNavigate();
    const [data, setData] = useState({status:""});
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
        if(loginStatus){
            setData(loginStatus);
        }
    }, []);

    const handleLogin = () => {
        if(data?.status == 'success' ){
        const updateData=[{}];
        localStorage.setItem("loginStatus",JSON.stringify(updateData))
        setOpen(true);
        setTimeout(()=>{
            window.location.reload();
        },1500)

        }else{
            navigate('/login');
        }
    }
   
  return<>
{open ? <Alerttext    text={"You have succesfully logged out your account..."} />:null}
       {!prop.st.current?  <Button onClick={handleLogin} className='newPlaylist' startIcon={<PersonIcon />} sx={{ marginBottom: '2rem' }}>{data.status == 'success' ? "Logout" : "Login"}</Button>:
       <IconButton onClick={handleLogin} sx={{boxShadow:'0px 0px 4px red',marginBottom:'2vh'}}><PersonIcon fontSize="medium" sx={{color:'white'}}/></IconButton>}
      
  </>
}
export default LoginButt;