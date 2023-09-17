import {Alert,AlertTitle} from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';

const Alerttext=(prop)=>{
    const [status,setStatus]=useState(false);
   
    const handleChange=()=>{
        setStatus(true);
        setTimeout(()=>{
            setStatus(false);
          },2000)
        
    }
    return<>
    <Button  onClick={handleChange}>change karo</Button>
    <Alert severity="success" sx={{position:'fixed',bottom:0,width:'100%',fontSize:'1rem',display:status? "block":"none",height:'max-content' }}>
  <AlertTitle>Success</AlertTitle>
  <strong>{prop.text}</strong>
</Alert>
    </>
}
export default Alerttext;