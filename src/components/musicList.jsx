import { useState, useEffect,useRef} from 'react';
import  '../styles/albumsonglist.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import playIcon from '../assets/play (4).png';
import store from '../store/store';



const MusicList=()=>{
 
  const navigate=useNavigate();
  const allData= useSelector((store)=>store);
  console.log(allData);
  const [libraryStatus,setLibraryStatus]=useState();
  // const id=allData.albumID.albumId;
  const id=localStorage.getItem("albumID");
  const url=`https://academics.newtonschool.co/api/v1/music/album/${id}`
  const headers = {
    'projectId': 'f104bi07c490',
  };
  const [musiclist, setData] = useState([]);
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
      setData(d.data);
      const arr2=JSON.parse(localStorage.getItem("libraryAlbum"));
      const ans2= arr2.filter((e)=>{
        return e._id==d.data._id;
        })
        if(ans2.length==0){
          setLibraryStatus(false);
        }else{
          setLibraryStatus(true);
        }
    });
  }, [])
  
 useEffect(()=>{

  
 },[]);
  


  const handleSaveLibrary=()=>{
    const obj=musiclist;
    const arr=JSON.parse(localStorage.getItem("libraryAlbum"));
    const ans= arr.filter((e)=>{
      return e._id==obj._id;
      })
    if (!ans.length==0){
      setLibraryStatus(false);
      // alert("library status is", libraryStatus ? "true":"false");
      arr.forEach(o => {
        if (o._id === obj._id) {
          arr.splice(arr.indexOf(o), 1);
          localStorage.setItem("libraryAlbum",JSON.stringify(arr));
        }
      });
    }else{
      arr.push(musiclist);
      localStorage.setItem("libraryAlbum",JSON.stringify(arr));
      setLibraryStatus(true);
      // alert("library status is", libraryStatus.current ? "true":"false");
      // alert("successfully added in library", libraryStatus.current);
    }
  }
  // console.log("ID is ", id); 
  // console.log("musiclist is ", musiclist); 

  

    return <>
     <Grid container spacing={2} className='albumpage'>
      <Grid className='imagebox' item md={4} sm={4} sx={{height: '200px' }} xs={12}>
        <img src={musiclist.image} alt="" />
      </Grid>
      <Grid item className='detailbox' md={8} sm={8} sx={{ height: '200px' }} xs={12}>
        <div>
          <h1>{musiclist.title}</h1>
          {musiclist.artists && musiclist.artists.map((e,ind)=>{
            return <>
            
            <span>{e.name}, </span>
            </>
          })}
          <h4>{musiclist.songs ? musiclist.songs.length : null} songs</h4>
          <p>
          <Button className='playbutton'  variant="outlined" onClick={()=>{
           navigate('/musiclist/songplay')
           localStorage.setItem('songIndex',0)}
           } >
              play
            </Button>
            <Button className='addbutton'  onClick={handleSaveLibrary} variant="contained"  color={!libraryStatus? "success" :"error"} >
              {!libraryStatus ? "Save in library" :"Delete from library"}
            </Button>
          </p>
        </div>
      </Grid>
      <Grid item className='albumsonglist' md={12} sm={12} sx={{ background: 'black', minHeight: '50vh' }} xs={12}>
        <ol>
          {musiclist.songs && musiclist.songs.map((e,ind)=>{
            return<>
            <li onClick={
              ()=>{
                navigate('/musiclist/songplay')
                localStorage.setItem('songIndex',ind);
              }
            }>{e.title}
            <img src={playIcon} className="playsm2" alt="icon" />
            </li>
            <hr />
            </>
          })}
        </ol>
      </Grid>

    </Grid>
    </>
}

export default MusicList;