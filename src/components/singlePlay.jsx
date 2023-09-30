import "../styles/singleplay.css";
import play from "../assets/play (2).png";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import React, { useState, useRef } from 'react';
import { Button } from "@mui/material";
import { useEffect } from "react";
import Alertt from "./alert";


const Singleplay = () => {
  // ----------------------------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const audioRef = useRef(null);
  const [timeDuration, setTimeDuration] = useState(0);
  const[alertText,setAlertText]=useState("");

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    if (!isNaN(audioRef.current?.duration)) {
      setTimeDuration(audioRef.current?.duration);
    }
  }, [audioRef.current?.duration]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  const handleLike = () => {
    const arr3 = JSON.parse(localStorage.getItem("loginStatus"));
    if (!arr3 || arr3.status != 'success') {
      setAlertText("you are not logged in, please login for use this functionality.");
      setOpen3(true);
          setTimeout(()=>{
            setOpen3(false);
          },1500)
      
    }
    else {
      const jwtToken = arr3 && arr3.token;
      const projectId = 'yda0liol0ofu';
      const apiUrl = 'https://academics.newtonschool.co/api/v1/music/favorites/like';
      const songId = songchoosen._id;

      const requestBody = {
        songId: songId,
      };


      fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'projectID': projectId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {

            throw new Error('Request failed');
          }
        })
        .then(data => {
          // console.log(data.message)
        data.message === 'song added to favorites successfully.' ?(setLikeStatus(true)) : setLikeStatus(false);
        setAlertText(data.message);
        setTimeout(()=>{
          setOpen4(true);
          setTimeout(()=>{
            setOpen4(false);

          },1000)
        })
        })
        .catch(error => {
          console.error('Error:', error);
        });

    }
  }
  // ----------------------------------------------
  const songchoosen = JSON.parse(localStorage.getItem('selected'));

  const arr2 = JSON.parse(localStorage.getItem("likedSongArrayUp"));
  const obj = songchoosen;
  const[open4,setOpen4]=useState(false);



  const handleLikePlaylist3 = () => {
    const arr3 = JSON.parse(localStorage.getItem("loginStatus"));
    const jwtToken = arr3.token; 
    if (arr3.status != 'success') {
      setAlertText("you are not logged in");
      setOpen3(true);
          setTimeout(()=>{
            setOpen3(false);
          },1500)
      // alert("you are not logged in");
    } else {
      const projectId = 'yda0liol0ofu'; 
      const apiUrl = 'https://academics.newtonschool.co/api/v1/music/favorites/like';
      const songId = songchoosen._id; 

      const requestBody = {
        songId: songId,
      };


      fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'projectID': projectId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => {
          if (response.ok) {
            return response.json(); // Parse the response JSON if needed
          } else {

            throw new Error('Request failed');
          }
        })
        .then(data => {
          
          // console.log('Response Data:', data);
        })
        .catch(error => {
          // setAlertText(`${error}`)
          // setOpen3(true);
          // setTimeout(()=>{
          //   setOpen3(false);
          // },1500)
          console.error('Error:', error);
        });

    }
  }
  const[open3,setOpen3]=useState(false);
  return <>
    <div className="singleplay">


      <img className="img1" src={songchoosen.thumbnail} alt="img1"  />


    </div>
    <div className="musicbar">
      {/* ----------------------------------------------------------- */}
      <style>
        {`
          .custom-seek-bar {
            position: absolute;
            top: 0;
            width: 100%;
            height: 4px;
            background-color: #ccc; 
            color:'blue';
          }

          .custom-seek-bar::before {
            content: '';
            position: absolute;
            height: 100%;
            width: ${(currentTime / audioRef.current?.duration) * 100}%; /* Adjust width based on current time */
            background-color: blue; /* Color to the left of the thumb */
            z-index: 1; /* Place it above the thumb */
          }
        `}
      </style>

      <input
        style={{ position: 'absolute', top: 0, }}
        type="range"
        value={currentTime}
        min={0}
        max={timeDuration}
        step={0.01}
        onChange={handleSliderChange}
        className="custom-seek-bar"
      />
      <div className="controls">

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={songchoosen.audio_url} type="audio/mpeg" />
        </audio>
        <SkipPreviousIcon onClick={() => {
          setAlertText("This is a single song .. prev button and next button will not work")
          setTimeout(()=>{
            setOpen3(true);
          setTimeout(()=>{
            setOpen3(false);
          },1500)
          },0)
        }} className="icon" sx={{ height: '40%', width: "30%" }}></SkipPreviousIcon>
        {!isPlaying ? <PlayArrowIcon sx={{ height: '40%', width: "30%" }} onClick={togglePlay}></PlayArrowIcon> : <PauseIcon sx={{ height: '40%', width: "30%" }} onClick={togglePlay}></PauseIcon>}

        <SkipNextIcon onClick={() => {
          setAlertText("This is a single song .. prev button and next button will not work")
          setTimeout(()=>{
            setOpen3(true);
          setTimeout(()=>{
            setOpen3(false);
          },1500)
          },0)
        }} className="icon" sx={{ height: '40%', width: "30%" }}></SkipNextIcon>
      </div>
      <div className="details2">
        <img className="img2" src={play} alt="" />
        <div>
          <h3>{songchoosen.title}</h3>
        </div>
      </div>
      <div className="likes2">
        <ThumbUpOffAltIcon color={likeStatus ? "primary" : "ksm"} onClick={handleLike} className="like" sx={{ height: '50%', width: '15%' }}></ThumbUpOffAltIcon>
        <ThumbDownOffAltIcon className="dislike" sx={{ height: '50%', width: '15%' }}></ThumbDownOffAltIcon>
      </div>
    </div>
    {open3 ?  <Alertt status={'fail'} text={alertText}/>: null}
    {open4 ?  <Alertt  text={alertText}/>: null}
  </>
}

export default Singleplay;