import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../styles/cards.css';
import { useNavigate } from 'react-router';

export default function Songcard(prop) {
    const navigate=useNavigate();
    const musiclist=prop.details;
    return (
        <Card className='albumcard' key={prop._id} sx={{ maxWidth: 345 }}
        onClick={()=>{
            const obj=musiclist;
            // console.log("musiclist is",obj);
            localStorage.setItem("selected",JSON.stringify(obj) );
           navigate('/explore/songplay')
        }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={musiclist.thumbnail}
                    alt="green iguana"
                />
                <CardContent>
                    
                    <h3>{musiclist.title}</h3>
                    <p>{musiclist.artist.map((e)=>{return <>
                        { e.name +"  "}
                    </>})}.</p>
                    

                </CardContent>
            </CardActionArea>
        </Card>
    );
}