import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
import { Alert, AlertTitle } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';





export default function App() {
  const musicIND = localStorage.getItem("songIndex");
  const navigate = useNavigate();

  const [likeMusicArr, setLikeMusucArr] = useState([]);
  const [songData, setsongData] = useState({});
  const [secondaryData, setSecondaryData] = useState();
  const [songUrl, setsongUrl] = useState('');
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislike, setDisLikeStatus] = useState(false);
  const [currentPage, setCurrentpage] = useState(Number(musicIND));
  // const allData = useSelector((store) => store);
  const id = localStorage.getItem("albumID");
  const url = `https://academics.newtonschool.co/api/v1/music/album/${id}`
  const headers = {
    'projectId': 'f104bi07c490',
  };
  const [post, setData] = useState();
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
      setData(d.data.songs);
      setsongData(d.data.songs[currentPage])
    });

  }, [])



  const handleSongSelection = (e) => {
    let songname = `${e.target.innerText}`
    let index = post.findIndex(e => e.title === songname);
    setCurrentpage(index);
    setsongData(post[index])
    setsongUrl(post[index].audio_url)

  }
  const arr2 = JSON.parse(localStorage.getItem("likedSongArrayUp"));
  const obj = songData;


  const [alertSt, setalertSt] = useState(false);

  const handleLikePlaylist3 = () => {
    const arr3 = JSON.parse(localStorage.getItem("loginStatus"));
    if (!arr3 || arr3.status != 'success') {
      // alert("you are not logged in");
      handleClickOpen()
    }
    else {

      setalertSt(true);
      setTimeout(() => {
        setalertSt(false);
      }, 1500)
      const jwtToken = arr3 && arr3.token; // Replace with your actual JWT token
      const projectId = 'yda0liol0ofu'; // Replace with your actual project ID
      const apiUrl = 'https://academics.newtonschool.co/api/v1/music/favorites/like';
      const songId = songData._id; // 

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
            // Request failed, handle the error
            throw new Error('Request failed');
          }
        })
        .then(data => {
          setSecondaryData(data);
          console.log(data.message === 'song added to favorites successfully.' ? (setLikeStatus(true)) : setLikeStatus(false));
        })
        .catch(error => {
          console.error('Error:', error);
        });

    }
  }



  const handleDislike = () => {
    const arr3 = JSON.parse(localStorage.getItem("loginStatus"));
    if (!arr3 || arr3.status != 'success') {
      // alert("you are not logged in");
      handleClickOpen()
    } else {
      setDisLikeStatus(!dislike);
    }

  }



  useEffect(() => {
    setLikeStatus(false);
    const arr4 = JSON.parse(localStorage.getItem("loginStatus"));
    if (arr4) {


      const jwtToken = arr4.token;;
      const projectId = 'f104bi07c490';
      const apiUrl = 'https://academics.newtonschool.co/api/v1/music/favorites/like';

      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'projectID': projectId,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Request failed');
          }
        })
        .then(data => {

          // console.log('Response Data:', data.data.songs);
          setLikeMusucArr(data.data.songs)
          const isObjectPresent = data.data.songs.some(obj => obj._id === songData._id);
          if (isObjectPresent) {
            setLikeStatus(true);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [songData]);
  //....................................................................
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // --------------------------------------------------------------------------------------------------------------------


  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);


  useEffect(() => {

    audioRef.current.src = post && post[currentPage].audio_url;
    console.log('songData.audio_url is', songData.audio_url)

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {

    if (currentPage > 0) {
      setCurrentpage(currentPage - 1);
      setsongData(post[currentPage - 1])
    }
  };

  const handleNext = () => {
    if (currentPage < post.length - 1) {
      setCurrentpage(currentPage + 1);
      setsongData(post[currentPage + 1])
      setsongUrl(songData.audio_url)
      // setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleTrackEnded = () => {
    if (currentPage < post.length - 1) {
      setCurrentpage(currentPage + 1);
      setsongData(post[currentPage + 1]);
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

    {secondaryData ?
      <Alert sx={{ position: 'fixed', top: 0, left: 0, zIndex: '11111', width: '100%', fontSize: '1.5rem', fontWeight: '700', display: alertSt ? "block" : "none", height: 'max-content' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
        {secondaryData.message}
      </Alert>
      : null}


    <div className="musicbar">
      <input
        style={{ width: "100vw", position: "absolute", top: '0' }}
        type="range"
        value={currentTime}
        min={0}
        max={audioRef.current ? audioRef.current.duration : 0}
        step={1}
        onChange={handleSliderChange}
      />

      <div className="controls">
        {/* =================================================================================================================================================== */}


        <audio ref={audioRef}></audio>


        <SkipPreviousIcon onClick={handlePrev} className="icon" sx={{ height: '40%', width: "30%" }}></SkipPreviousIcon>
        {!isPlaying ? <PlayArrowIcon sx={{ height: '40%', width: "30%" }} onClick={handlePlayPause}></PlayArrowIcon> : <PauseIcon sx={{ height: '40%', width: '30%' }} onClick={handlePlayPause}></PauseIcon>}
        <SkipNextIcon onClick={handleNext} className="icon" sx={{ height: '40%', width: "30%" }} ></SkipNextIcon>



      </div>

      <div className="details2">
        <img className={isPlaying ? "img20" : "img2"} src={play} alt="" />
        <div className='h'>

          {songData ? <h3>{songData.title}</h3> : null}
          
        </div>
      </div>
      <div className="likes2">
        <ThumbUpOffAltIcon onClick={handleLikePlaylist3} color={likeStatus ? "primary" : "ksm"} className="like" sx={{ height: '50%', width: "20%" }}></ThumbUpOffAltIcon>

        <ThumbDownOffAltIcon onClick={handleDislike} color={dislike ? "primary" : "ksm"} className="dislike" sx={{ height: '50%', width: "20%" }}></ThumbDownOffAltIcon>
      </div>
    </div >
    <Grid container spacing={2} className='albumpage'>

      <Grid className='imagebox' item md={7} sm={7} sx={{ background: 'black', height: '80vh' }} xs={12}>
        <img src={songData?.thumbnail} />
      </Grid>
      <Grid item className='detailbox' md={5} sm={5} sx={{ background: 'black', color: 'white', height: '80vh' }} xs={12}>
        <h2>Album songs</h2>
        <ol>
          {post && post.map((e, index) =>
            <li key={index} className={currentPage == index ? 'selected' : null} onClick={handleSongSelection}>{e.title}
              <img src={playIcon} className={currentPage == index ? 'playsm3' : "playy"} alt="icon" />
            </li>
          )}
        </ol>
      </Grid>
    </Grid>
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ color: '#0795ed', fontWeight: 600 }} id="responsive-dialog-title">
          {"Login and Authentication"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>
              OOPS ...! Seems like you are not logged in. Login for use this feature of YouTube Music.
            </strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: 'red' }} onClick={handleClose}>
            Close
          </Button>
          <Button sx={{ color: 'green' }} onClick={() => {
            navigate('/login')
          }} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  </>
}