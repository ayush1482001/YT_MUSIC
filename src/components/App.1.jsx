import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import playIcon from '../assets/play (4).png';
import play from "../assets/play (2).png";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function App() {
    const musicIND = localStorage.getItem("songIndex");


    const [likeMusicArr, setLikeMusucArr] = useState([]);
    const [songData, setsongData] = useState({});
    const [secondaryData, setSecondaryData] = useState();
    const [songUrl, setsongUrl] = useState('');
    const [likeStatus, setLikeStatus] = useState(false);
    const [dislike, setDisLikeStatus] = useState(false);
    const [currentPage, setCurrentpage] = useState(Number(musicIND));
    const allData = useSelector((store) => store);
    const id = localStorage.getItem("albumID");
    const url = `https://academics.newtonschool.co/api/v1/music/album/${id}`;
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
            setsongData(d.data.songs[currentPage]);
        });

    }, []);




    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentpage(currentPage - 1);
        }
        setsongData(post[currentPage]);
    };
    const handleNext = () => {
        if (currentPage < post.length - 1) {
            setCurrentpage(currentPage + 1);
        }
        // console.log(post[currentPage])
        setsongData(post[currentPage]);
        setsongUrl(songData.audio_url);
    };
    const handleSongSelection = (e) => {
        let songname = `${e.target.innerText}`;
        let index = post.findIndex(e => e.title == songname);
        setCurrentpage(index);
        setsongData(post[index]);
        setsongUrl(songData.audio_url);
    };
    const arr2 = JSON.parse(localStorage.getItem("likedSongArrayUp"));
    const obj = songData;


    const [alertSt, setalertSt] = useState(false);

    const handleLikePlaylist3 = () => {
        const arr3 = JSON.parse(localStorage.getItem("loginStatus"));
        if (arr3.status != 'success') {
            alert("you are not logged in");
        } else {


            setalertSt(true);
            setTimeout(() => {
                setalertSt(false);
            }, 1500);
            const jwtToken = arr3.token; // Replace with your actual JWT token
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
    };



    const handleDislike = () => {
        setDisLikeStatus(!dislike);

    };

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


    useEffect(() => {
        setLikeStatus(false);
        const arr4 = JSON.parse(localStorage.getItem("loginStatus"));
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
                setLikeMusucArr(data.data.songs);
                const isObjectPresent = data.data.songs.some(obj => obj._id === songData._id);
                if (isObjectPresent) {
                    setLikeStatus(true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [songData]);
    // 
    return <>

        {secondaryData ?
            <Alert sx={{ position: 'fixed', top: 0, left: 0, zIndex: '11111', width: '100%', fontSize: '1.5rem', fontWeight: '700', display: alertSt ? "block" : "none", height: 'max-content' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                {secondaryData.message}
            </Alert>
            : null}
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
                className="custom-seek-bar" />
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

                <SkipNextIcon onClick={handleNext} className="icon" sx={{ height: '2.5rem', width: "2.5rem" }}></SkipNextIcon>
            </div>
            <div className="details2">
                <img className={isPlaying ? "img20" : "img2"} src={play} alt="" />
                <div>

                    {songData ? <h3>{songData.title}</h3> : null}
                    <p>Shubh . 20M</p>
                </div>
            </div>
            <div className="likes2">
                <ThumbUpOffAltIcon onClick={handleLikePlaylist3} color={likeStatus ? "primary" : "ksm"} className="like" sx={{ height: '2rem', width: "2rem" }}></ThumbUpOffAltIcon>

                <ThumbDownOffAltIcon onClick={handleDislike} color={dislike ? "primary" : "ksm"} className="dislike" sx={{ height: '2rem', width: "2rem" }}></ThumbDownOffAltIcon>
                {/* <Button size="small" variant="outlined" onClick={handleLikePlaylist3}>add to playlist</Button> */}
            </div>
        </div>
        <Grid container spacing={2} className='albumpage'>
            <Grid className='imagebox' item md={7} sm={7} sx={{ background: 'black', height: '80vh' }} xs={12}>
                <img src={songData.thumbnail} />
            </Grid>
            <Grid item className='detailbox' md={5} sm={5} sx={{ background: 'black', color: 'white', height: '80vh' }} xs={12}>
                <h2>Album songs</h2>
                <ol>
                    {post && post.map((e, index) => <li className={currentPage == index ? 'selected' : null} onClick={handleSongSelection}>{e.title}
                        <img src={playIcon} className={currentPage == index ? 'playsm3' : "playy"} alt="icon" />
                    </li>
                    )}
                </ol>
            </Grid>
        </Grid>

    </>;
}
