import * as React from 'react';

import { useState, useEffect, useRef } from 'react';
import '../styles/musicpage.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import playIcon from '../assets/play (4).png';
import "../styles/singleplay.css";
import play from "../assets/play (2).png";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';






export default function App(prop) {
    const [post, setData] = useState([]);
  const [songData, setsongData] = useState({});
  const [songUrl, setsongUrl] = useState('');
  const [currentPage, setCurrentpage] = useState(0);



  useEffect(() => {
    const arr=JSON.parse(localStorage.getItem("likedSongArrayUp"));
      setData(prop.songlist);
      setsongData(prop.songlist[currentPage]);
  }, [prop])

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentpage(currentPage - 1);
    }
    setsongData(post[currentPage])
  }
  const handleNext = () => {
    if (currentPage < post.length - 1) {
      setCurrentpage(currentPage + 1);
    }
    setsongData(post[currentPage])
    setsongUrl(songData.audio_url)
  }
  const handleSongSelection = (e) => {
    let songname = `${e.target.innerText}`
    let index = post.findIndex(e => e.title == songname);
    setCurrentpage(index);
    setsongData(post[index])
    setsongUrl(songData.audio_url)
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  return <>
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
        type="range"
        value={currentTime}
        min={0}
        max={audioRef.current ? audioRef.current.duration : 0}
        step={0.01}
        onChange={handleSliderChange}
        className="custom-seek-bar"
      />
      {/* ----------------------------------------------------------- */}

      <div className="controls">


        {songData ?
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
          >
            {/* <source src={songData.audio_url} type="audio/mpeg" /> */}
            <source src="https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf93b947ae38c3e33a5a5d.mp3" type="audio/mpeg" />
          </audio>
          : null}
        <SkipPreviousIcon onClick={handlePrev} className="icon" sx={{ height: '2.5rem', width: "2.5rem" }}></SkipPreviousIcon>
        {!isPlaying ? <PlayArrowIcon sx={{ height: '2.5rem', width: "2.5rem" }} onClick={togglePlay}></PlayArrowIcon> : <PauseIcon sx={{ height: '2.5rem', width: "2.5rem" }} onClick={togglePlay}></PauseIcon>}

        <SkipNextIcon onClick={handleNext} className="icon" sx={{ height: '2.5rem', width: "2.5rem" }} ></SkipNextIcon>
      </div>
      <div className="details2">
        <img className={isPlaying?"img20":"img2"} src={play} alt="" />
        <div>

          {songData ? <h3>{songData.title}</h3> : null}
          {/* <p>{songData.artist ? songData.artist[0] :null }. 20M</p> */}
        </div>
      </div>
      <div className="likes2">
       <ThumbUpOffAltIcon  color="primary"  className="like" sx={{ height: '2rem',width: "2rem" }}></ThumbUpOffAltIcon>
    
        <ThumbDownOffAltIcon   className="dislike" sx={{ height: '2rem', width: "2rem" }}></ThumbDownOffAltIcon>
      
      </div>
    </div>
    <Grid container spacing={2} className='albumpage'>
      <Grid className='imagebox' item md={7} sm={7} sx={{ background: 'black', height: '80vh' }} xs={12}>
        <img src={songData.thumbnail} /> 
      </Grid>
      <Grid item className='detailbox' md={5} sm={5} sx={{ background: 'black', color: 'white', height: '80vh' }} xs={12}>
        <h2>Your Likes</h2>
        <ol>
          {post && post.map((e, index) =>
            <li className={currentPage == index ? 'selected' : null} onClick={handleSongSelection}>{e.title}
              <img src={playIcon} className={currentPage == index ? 'playsm3' : "playy"} alt="icon" />
            </li>
          )}
        </ol>
      </Grid>
    </Grid>

  </>
}