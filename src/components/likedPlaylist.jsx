import { useState,useEffect } from "react";
import'../styles/likedPlaylist.css';
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router";
import Playlist from './likedMusicPlay'


const TryLikedPlayList=()=>{
const navigate=useNavigate();

    // const [data,setData]=useState([]);
    // useEffect(()=>{
    //    setData(JSON.parse(localStorage.getItem("likedSongArrayUp")));
    // },[]);/
    const arr3=JSON.parse(localStorage.getItem("loginStatus"));
    const jwtToken = arr3?.token; // Replace with your actual JWT token
    const url = 'https://academics.newtonschool.co/api/v1/music/favorites/like';
    const headers = {
      'projectId': 'f104bi07c490',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`, 
    };

    const [likedSong,setLikedSong]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(url, { headers });
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error(response.statusText);
          }
        };
        fetchData().then((d) => {
            setLikedSong(d.data.songs);
            console.log(d.data.songs);
        });
      }, []);
      // const st=localStorage.getItem('loginStatus');
      // if (!st || st.status !=='success') {
      //     alert("you are not logged in, playlist is not available")
      // }

    return<>
    <div className="playlist">
    {likedSong.length>0 ? 
    <Playlist songlist={likedSong}/> 
    : <div className="EmptyErr"><Button variant="contained" className="backBtn" onClick={() => navigate(-1)}  color="primary">Back</Button> <span class="loader2">Play list is Empty OR user is not Loggedin</span></div>}
    </div>
    </>
}
export default TryLikedPlayList;