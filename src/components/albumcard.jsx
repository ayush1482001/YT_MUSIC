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
        <Card className='albumcard' key={prop._id} sx={{
            
            width: {
              xs: 100,   
              sm: 150,   
              md: 180,   
              lg: 225,   
            },
            height: {
              xs: 150,   
              sm: 200,   
              md: 250,   
              lg: 300,   
            },
          }} onClick={(e)=>{
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
                    sx={{  height: {
                        xs: 100,   // Adjust the size for xs (extra small) screens
                        sm: 135,   // Adjust the size for sm (small) screens
                        md: 170,   // Adjust the size for md (medium) screens
                        lg: 200,   // Default size for lg (large) screens
                      },}}
                />
                <img src={playIcon} alt="tini play" className='playsm' />
                <CardContent sx={{padding:'6px'}}>
                    
                    {/* <h5>{musiclist.title}</h5> */}
                    <Typography variant="h6" sx={ {fontWeight:'550', fontSize: {
              xs: 10,   
              sm: 12,   
              md: 14,   
              lg: 17,  
            }}}>{musiclist.title}</Typography>
                    <Typography variant="p" sx={ {color:'grey', fontSize: {
              xs: 7,   
              sm: 10,   
              md: 12,   
              lg: 14,  
            }}}>{musiclist.artists && musiclist.artists.map((e,ind)=>
                <span key={ind}>{ e.name +"  "}</span>
           )}.</Typography>
                   
                    

                </CardContent>
            </CardActionArea>
        </Card>
    );
}