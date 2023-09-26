import { useState,useEffect } from "react";
import'../styles/likedPlaylist.css';
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router";
import Playlist from './likedMusicPlay'
import Alert from '../components/alert';


const TryLikedPlayList=()=>{
const navigate=useNavigate();

    const arr3=JSON.parse(localStorage.getItem("loginStatus"));
    const jwtToken = arr3?.token; // Replace with your actual JWT token
    const url = 'https://academics.newtonschool.co/api/v1/music/favorites/like';
    const headers = {
      'projectId': 'f104bi07c490',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`, 
    };

    const [likedSong,setLikedSong]=useState([]);
    const [open,setOpen]=useState(false);
    if(arr3.status=='success'){
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(url, { headers });
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error(response.status);
          }
        };
        fetchData().then((d) => {
            setLikedSong(d.data.songs);
            
        }).catch((err) => {
          if(err.message==401){

            setOpen(true);
            setTimeout(()=>{
              setOpen(false);
            },3000);
          }
         
        })
      }, []);
    }

    return<>
    <div className="playlist">
    {likedSong.length>0 ? 
    <Playlist songlist={likedSong}/> 
    : <div className="EmptyErr"> <span className="loader2" style={{fontSize:'4vw'}}>Playlist is empty...</span></div>}
    </div>
   {open ?  <Alert status={'fail'} text={"Seems like you are not logged in... Login for see liked songs."}/>:null}
    </>
}
export default TryLikedPlayList;