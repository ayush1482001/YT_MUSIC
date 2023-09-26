
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';



const Avt=({userrData})=>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openup = Boolean(anchorEl);
    const handleClick2 = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return<>
      <Avatar sx={{ background: '#0786ed' }} alt={userrData?.status == "success" ? userrData?.data.name : null} src="#"  aria-controls={openup ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openup ? 'true' : undefined}
        onClick={handleClick2} />
                            <Menu
     id="basic-menu"
     anchorEl={anchorEl}
     open={openup}
     onClose={handleClose}
     MenuListProps={{
       'aria-labelledby': 'basic-button',
     }}
   >
    {userrData?.status ? 
    
        <Box sx={{padding:'10px 50px 10px 30px'}}>
       
       <Box sx={{display:'flex',alignItems:'center',gap:'1vw'}}>
       <Avatar sx={{ background: '#0786ed' }} alt={userrData?.status == "success" ? userrData?.data.name : null} src="#"  
       />
       
       <h2 style={{display:'inline-block' ,fontFamily:'verdana'}}>{userrData?.status == "success" ? userrData?.data.name :"username"}</h2>
       </Box>
       <span>{userrData?.status == "success" ? userrData?.data.email :"user Email"}</span>
        </Box>
         :
        <Box sx={{padding:'10px 50px 10px 30px',display:'flex',alignItems:'center',gap:'1vw'}}>
            <Avatar src="#"  /> 
       <h6 style={{fontWeight:'600'}}>Seems like you are not logged in. </h6>
        </Box>
        }
    
   </Menu></>
}
export default Avt;