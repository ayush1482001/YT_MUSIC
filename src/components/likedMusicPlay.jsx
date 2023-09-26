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






export default function App(prop){ 
  const [post, setData] = useState([]);
  const [songData, setsongData] = useState({});
  const [songUrl, setsongUrl] = useState('');
  const [currentPage, setCurrentpage] = useState(0);



  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("likedSongArrayUp"));
    setData(prop.songlist);
    setsongData(prop.songlist[currentPage]);
  }, [prop])

  const handlePrev = () => {

    if (currentPage > 0) {
      setCurrentpage(currentPage - 1);
      setsongData(post[currentPage - 1])
    }
  };
  const handleNext = () => {
    if (currentPage < post.length - 1) {
      setsongData(post[currentPage + 1])
      setCurrentpage(currentPage + 1);
      setsongUrl(songData?.audio_url)
    }
  };
  const handleSongSelection = (e) => {
    let songname = `${e.target.innerText}`
    let index = post.findIndex(e => e.title == songname);
    setCurrentpage(index);
    setsongData(post[index])
    setsongUrl(songData.audio_url)
  }


  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeDuration, setTimeDuration] = useState(0);
  const audioRef = useRef(null);


  useEffect(() => {

    if (isPlaying) {
      audioRef.current.play();

    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);


  useEffect(() => {
    audioRef.current.src = post && post[currentPage]?.audio_url;

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentPage, post]);

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleTrackEnded);

    // return () => {
    //   audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    //   audioRef.current.removeEventListener('ended', handleTrackEnded);
    // };
  }, [currentPage]);

  useEffect(() => {
    if (!isNaN(audioRef.current?.duration)) {
      setTimeDuration(audioRef.current?.duration);
    }
  }, [audioRef.current?.duration]);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime);
  };

  const handleTrackEnded = () => {
    if (currentPage < post.length - 1) {
      setsongData(post[currentPage + 1]);
      setCurrentpage(currentPage + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };
  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };



  return <>
  

      <div className="musicbar">
        <input
          style={{ width: "100vw", position: "absolute", top: '0' }}
          type="range"
          value={currentTime}
          min={0}
          max={timeDuration}
          step={1}
          onChange={handleSliderChange}
        />
        {/* ----------------------------------------------------------- */}

        <div className="controls" >


          <audio ref={audioRef}></audio>
          <SkipPreviousIcon onClick={handlePrev} className="icon" sx={{ height: '2.5rem', width: "2.5rem" }}></SkipPreviousIcon>
          {!isPlaying ? <PlayArrowIcon sx={{ height: '2.5rem', width: "2.5rem" }} onClick={handlePlayPause}></PlayArrowIcon> : <PauseIcon sx={{ height: '2.5rem', width: "2.5rem" }} onClick={handlePlayPause}></PauseIcon>}

          <SkipNextIcon onClick={handleNext} className="icon" sx={{ height: '2.5rem', width: "2.5rem" }} ></SkipNextIcon>
        </div>
        <div className="details2">
          <img className={isPlaying ? "img20" : "img2"} src={play} alt="" />
          <div>

            {songData ? <h3>{songData.title}</h3> : null}
          </div>
        </div>
        <div className="likes2">
          <ThumbUpOffAltIcon color="primary" className="like" sx={{ height: '2rem', width: "2rem" }}></ThumbUpOffAltIcon>

          <ThumbDownOffAltIcon className="dislike" sx={{ height: '2rem', width: "2rem" }}></ThumbDownOffAltIcon>

        </div>
      </div>
      <Grid container spacing={2} className='albumpage'>
        <Grid className='imagebox' item md={7} sm={7} sx={{ background: 'black', height: '70vh' }} xs={12}>
          <img style={{height:'100%',width:'100%'}} src={songData.thumbnail} />
        </Grid>
        <Grid item className='detailbox' md={5} sm={5} sx={{ background: 'black', color: 'white', height: '80vh' }} xs={12}>
          <h2>Your Likes</h2>
          <ol>
            {post && post.map((e, index) =>
              <li key={index} className={currentPage == index ? 'selected' : null} onClick={handleSongSelection}>{e.title}
                <img src={playIcon} className={currentPage == index ? 'playsm3' : "playy"} alt="icon" />
              </li>
            )}
          </ol>
        </Grid>
      </Grid>

    </>
  }