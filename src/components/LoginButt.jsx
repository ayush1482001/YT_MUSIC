import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router";
import IconButton from '@mui/material/IconButton';

const LoginButt = (prop) => {
    const navigate=useNavigate();
    const [data, setData] = useState({status:""});
    useEffect(() => {
        const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
        if(loginStatus){
            setData(loginStatus);
        }
    }, []);

    const handleLogin = () => {
        if(data?.status == 'success' ){
        // const userData=JSON.parse(localStorage.getItem("loginStatus"));
        const updateData=[{}];
        localStorage.setItem("loginStatus",JSON.stringify(updateData))
        window.location.reload();
        // localStorage.setItem("loginStatus",JSON.stringify(d));
        }else{
            navigate('./login');
        }
    }
    // console.log(prop.st.current)
  return<>
       {!prop.st.current?  <Button onClick={handleLogin} className='newPlaylist' startIcon={<PersonIcon />} sx={{ marginBottom: '2rem' }}>{data.status == 'success' ? "Logout" : "Login"}</Button>:
       <IconButton sx={{boxShadow:'0px 0px 4px red',marginBottom:'2vh'}}><PersonIcon fontSize="medium" sx={{color:'white'}}/></IconButton>}
       
  </>
}
export default LoginButt;