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
    // console.log("musiclist is",prop.details);
    return (
        <Card className='albumcard' key={prop._id} sx={{width: {
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
          }, }}
        onClick={()=>{
            const obj=musiclist;
            localStorage.setItem("selected",JSON.stringify(obj) );
           navigate('/explore/songplay')
        }}
        >
            <CardActionArea>
                <CardMedia
                sx={{padding:'6px'}}
                    component="img"
                    image={musiclist.thumbnail}
                    alt="green iguana"
                    sx={{  height: {
                        xs: 100,   // Adjust the size for xs (extra small) screens
                        sm: 135,   // Adjust the size for sm (small) screens
                        md: 170,   // Adjust the size for md (medium) screens
                        lg: 200,   // Default size for lg (large) screens
                      },}}
                />
                <CardContent>
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
            }}}>{(musiclist.artist).map((e,ind)=>
                <span key={ind}>{ e.name +" "}</span>
             )}</Typography>
                    
                   

                </CardContent>
            </CardActionArea>
        </Card>
    );
}