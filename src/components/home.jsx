import Subnav from './subnav'
import MediaControlCard from './songcard'
import ActionAreaCard from './albumcard'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Spinner from './spinner'
import "../App.css";
import Songcard from './songcard'






const Home = (prop) => { 
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();
  const url = `https://academics.newtonschool.co/api/v1/music/album?page=${page}&limit=10`;
  const headers = {
    'projectId': 'f104bi07c490',
  };
  const [data, setData] = useState([]);
  const [alldata, setAlldata] = useState([]);
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
        setData(d);
    });
  }, [page]);
  
const [fulldata,setfulldata]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch( `https://academics.newtonschool.co/api/v1/music/album`, { headers });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(response.statusText);
      }
    };
    fetchData().then((d) => {
      setAlldata(d.data);
      setfulldata(d.data);
    });
  }, []);
    useEffect(() =>{
    
      const array = fulldata.filter((element) =>element.title.toLowerCase().includes(prop.searchValue.toLowerCase())  );
      setAlldata(array);
    },[prop.searchValue])
    

  
  //   console.log("Alldata is,",alldata)
  // console.log("data is ", data.data);

  return <>
   

   
    {!prop.searchValue ?  <h1 className='mix'>Mix for you</h1>:<h1 className='mix'>Your search</h1>}
    <div className="Home-sub-container">
      {!data.data ? <Spinner /> : null}
      <Grid container sx={{ display: "flex", justifyContent: "center" }} spacing={2}>
       { prop.searchValue ? alldata.map((e,ind)=>{
        return <>
        <Grid key={ind}  item lg={2.4} >
          <ActionAreaCard details={e}  />
        </Grid>
      </>

       })
      :
        data.data && (data.data).map((e,ind) => {
          return <>
            <Grid  key={ind} item lg={2.4} >
              <ActionAreaCard key={ind} details={e}  />
            </Grid>
          </>
        })
      }
        {data.data && !prop.searchValue ? <Pagination sx={{ display: 'flex', justifyContent: 'center', width: "100%", color: 'white', margin: '50px 0' }} count={10} page={page} color={'primary'} onChange={handleChange} /> : null}
      </Grid>


    </div>
    {/* <MediaControlCard/> */}

  </>
}

export default Home;