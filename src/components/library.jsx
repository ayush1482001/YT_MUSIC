import '../styles/library.css';
import Spinner2 from './spinner2';
import LikedIcon from "../assets/likedmusic.jpg";
import PushPinIcon from '@mui/icons-material/PushPin';
import PlayIcon from '../assets/play (3).png'
import { useState,useEffect} from 'react';
import AlbumCard from './albumcard'
import { useNavigate } from 'react-router';

import Alerttext from "./alert"


const Library = () => {
    const [data,setData]=useState([]);
    const navigate=useNavigate();
   
        const arr=JSON.parse(localStorage.getItem("libraryAlbum"));
    
        const handleLikePlayList=()=>{
            navigate('/LikePlaylist/songplay')       
        }
    
    return <>
  
        <div className='library'>
            <h2>All albums you've liked are here </h2>
           <div className="likedSong" >
           <div className="likeMusicCard" onClick={handleLikePlayList} sx={{ maxWidth: 345 }}>
            <img src={LikedIcon} alt="liked album" />
            <img className='icon4' src={PlayIcon} alt="icon" />
            <h5>Your Likes</h5>
            <p><PushPinIcon/> Auto playlist</p>
           
        </div>
          
           {arr && arr.map((e)=>{
            return<>
            <AlbumCard details={e} onClick={handleLikePlayList}/>
            {/* <h2 key={e._id}>{e.title}</h2> */}
            </>
           })}
            </div> 
            </div> 
    </>
}

export default Library;