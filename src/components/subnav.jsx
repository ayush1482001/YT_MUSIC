import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Subnav=()=>{
    const [moodVal,setMoodVal]=useState('');
    const handleClick=(e)=>{
       e.target.value && setMoodVal(e.target.value);
    }
    const mood={value:moodVal,}
    return<>
    <div className="subnav" onClick={handleClick}>
    <Button variant="outlined" value="relax" style={{ textTransform: 'capitalize' }}>Relax</Button>
    <Button variant="outlined" value="work" style={{ textTransform: 'capitalize' }}>Workout</Button>
    <Button variant="outlined" value="energy" style={{ textTransform: 'capitalize' }}>Energize</Button>
    <Button variant="outlined" value="commute" style={{ textTransform: 'capitalize' }}>Commute</Button>
    <Button variant="outlined" value="focus"  style={{ textTransform: 'capitalize' }}>Focus</Button>
        
    </div>
    </>
    

}
export default Subnav;
