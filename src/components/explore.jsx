import '../styles/explore.css';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { useState, useEffect } from 'react';
import ActionAreaCard from './albumcard'
import Songcard from './songcard';
import Spinner2 from './spinner2';
import { Pagination } from '@mui/material';




const Explore = () => {
  //----------------------------------------------------------

  const [page, setPage] = useState(1);
  const [catVal, setCatVal] = useState("");
  const [moodVal, setmoodVal] = useState("");
 
  
    const [url, setUrl] = useState(`https://academics.newtonschool.co/api/v1/music/song?page=${page}&limit=10`);
  const headers = {
    'projectId': 'f104bi07c490',
  };
  const [exploreData, setExploreData] = useState([]);
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
      setExploreData(d);
    });
  }, [page,url])
  const handleChange = (event, value) => {
    setPage(value);
    setUrl(`https://academics.newtonschool.co/api/v1/music/song?page=${page}&limit=10`)
  };
  const handleNewRelease = () => {
    setCatVal("newrelease");
    setPage(1);
    setUrl(`https://academics.newtonschool.co/api/v1/music/song?sort={"release":1}&page=${page}&limit=10`);
   
  }
  const handleTrending = () => {

    setCatVal("chart");
  }
  const handleMood = () => {
    setCatVal("moods");
    setPage(1);
    setUrl(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"sad"}&page=${page}&limit=10`);
  }


  //----------------------------------------------------------
  return <>
    <div className="explore">
      <div className="subnavigation" >
        <Grid container spacing={2} >
          <Grid item className='explore_category' xs={12} sm={12} md={6} >
            <Button variant="contained" sx={{color:catVal=="newrelease" ? "red" : null,borderBottom: catVal=="newrelease" ? "3px solid red":null}} onClick={handleNewRelease} startIcon={<NewReleasesIcon />} activeColor="red">New releases</Button>
          </Grid>
          {/* <Grid item className='explore_category' xs={12} sm={12} md={4}>
            <Button variant="contained" sx={{color:catVal=="chart" ? "red" : null,borderBottom: catVal=="chart" ? "3px solid red":null}}  onClick={handleTrending} startIcon={<TrendingUpIcon />}>Charts</Button>
          </Grid> */}
          <Grid item className='explore_category' xs={12} sm={12} md={6} >
            <Button variant="contained" sx={{color:catVal=="moods" ? "red" : null,borderBottom: catVal=="moods" ? "3px solid red":null}} onClick={handleMood} startIcon={<SentimentSatisfiedIcon />}>Mood and genres</Button>
          </Grid>
        </Grid >
        <Grid container  spacing={2} sx={{color:'white',margin:'2vh 0' ,display:catVal=="moods"? "block" : "none"}}>
        <Grid container sx={{margin:'2vh 0'}}>        
          <Grid item className='mood_category' xs={12} sm={3} >
            <Button variant="outlined"sx={{backgroundColor:moodVal=="happy" ? "rgb(0, 132, 255)" : null}} onClick={()=>{
              setmoodVal("happy")
              setUrl(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"happy"}&page=${page}&limit=10`);}} >Happy</Button>
          </Grid>
          <Grid item className='mood_category'  xs={12} sm={3} >
            <Button variant="outlined" sx={{backgroundColor:moodVal=="romantic" ? "rgb(0, 132, 255)" : null}} onClick={()=>{
              setmoodVal("romantic")
              setUrl(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}&page=${page}&limit=10`); }}>Romantic</Button>
          </Grid>
          <Grid item className='mood_category' xs={12} sm={3} >
            <Button variant="outlined" sx={{backgroundColor:moodVal=="excited" ? "rgb(0, 132, 255)" : null}} onClick={()=>{
              setmoodVal("excited")
              setUrl(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"excited"}&page=${page}&limit=10`); }}>Excited</Button>
          </Grid>
          
          <Grid item className='mood_category' xs={12} sm={3} >
            <Button variant="outlined" sx={{backgroundColor:moodVal=="sad" ? "rgb(0, 132, 255)" : null}} onClick={()=>{
              setmoodVal("sad")
              setUrl(`https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"sad"}&page=${page}&limit=10`);
             }}>Sad</Button>
          </Grid>
          </Grid>
          </Grid>
      </div>
      <div className="explore_mainContainer">
        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '60vh' }} spacing={2}>
          {!exploreData.data ? <Spinner2 /> : null}
          {exploreData.data && (exploreData.data).map((e) => {
            return <>
              <Grid item lg={2.4} >
                <Songcard details={e} />
              </Grid>
            </>
          })}
          {exploreData.data && <Pagination sx={{ display: 'flex', justifyContent: 'center', width: "100%", color: 'white', margin: '50px 0' }} count={10} page={page} color={'primary'} onChange={handleChange} />}
        </Grid>
      </div>
    </div>
  </>
}

export default Explore;