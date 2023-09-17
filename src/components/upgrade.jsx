import Button from '@mui/material/Button';
import '../styles/upgrade.css'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import YouTubeLOGO from '../assets/yt-music-logo.png';
import play from '../assets/play-icon.png';
import headphone from '../assets/headphone-logo.png';
import download from '../assets/download-icon.png';
import { useNavigate } from 'react-router';

const Upgradee = () => {
    const navigate=useNavigate();
    const handleDead = () => {
        alert("This link is not working for now.. functionality  is in progress...");
    };
    const handleprem = () => {
       navigate('/premium');
    };
    return <>
        <div className="yt_premium">
            <img src={YouTubeLOGO} alt="yt_logo" />
            <h1>Get Music Premium to listen to music <br />ad-free, offline & with your screen off</h1>
            <Button variant="contained" onClick={handleprem}>get music Premium</Button>
            <h1>Prepaid and subscription plans available. Prices start <br />at ₹99.00/month. Free trials available with subscription plans only.</h1>
            <p>Or save money with an annual, <span className='link-a'>family or student plan <br /> Restrictions apply. Learn more here.</span> </p>
        </div>
        <div className="first_poster">
            <div className="card3">
                <img src={headphone} alt="play icon" />
                <h2>Listen in the <br />background</h2>
                <h5>Don’t worry about your music stopping <br /> when you lock your screen .</h5>
            </div>
            <div className="card3">
                <img src={play} alt="play icon" />
                <h2>Ad-free music</h2>
                <h5>Listen to the world of music without ads.</h5>
            </div>
            <div className="card3"><img src={download} alt="" />
                <h2>Download and go</h2>
                <h5>Listen to your favorite music on the go.</h5>
            </div>
        </div>
        <div className="second_poster">
            <div> <h1>Background Play</h1>
                <h4>Turn off the screen, use other apps, all while your music <br /> keeps playing.</h4>
            </div>
        </div>
        <div className="third_poster">
            <div> <h1>No ads or interruptions <br /> on music</h1>
                <h4>Easily explore the world of music without any <br /> interruptions.</h4>
            </div>
        </div>
        <div className="forth_poster">
            <div> <h1> Download your favorite 
                <h1 />
                <h1></h1>tracks</h1>
                <h4>No connection? No problem. Take your songs, albums <br /> and playlists offline..</h4>
            </div>
        </div >
        <div className="final_poster">
            <h4>Have other questions? <span className='link-a'>Visit the YouTube Help Center</span> </h4>
        </div>
    </>
}

export default Upgradee;