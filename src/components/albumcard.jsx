import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';
import '../styles/cards.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import playIcon from '../assets/play (2).png';


export default function ActionAreaCard(prop) {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [currentAlbum,setCurrentAlbum] = useState('');
    const musiclist=prop.details;
    let actionNameReducer={
        type:"albumID",
        payload:currentAlbum,
    };
    return (
        <Card className='albumcard' key={prop._id} sx={{ maxWidth: 345 }} onClick={(e)=>{
            setCurrentAlbum(e.target.id);
            localStorage.setItem("albumID", e.target.id);
            actionNameReducer={...actionNameReducer,payload:e.target.id};
            dispatch(actionNameReducer) 
            navigate("/musiclist");}}>
            <CardActionArea>
                <CardMedia
                className='imgposter'
                    component="img"
                    height="140"
                    image={musiclist.image}
                    alt="green iguana"
                    id={musiclist._id}
                />
                <img src={playIcon} alt="tini play" className='playsm' />
                <CardContent>
                    
                    <h5>{musiclist.title}</h5>
                    <p>{musiclist.artists && musiclist.artists.map((e,ind)=>
                        <span key={ind}>{ e.name +"  "}</span>
                   )}.</p>
                    

                </CardContent>
            </CardActionArea>
        </Card>
    );
}