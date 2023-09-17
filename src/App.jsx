import './App.css'
import {useDispatch }from 'react-redux';
import TryHome from './container/tryHome';
import TryExplore from './container/tryExplore';
import TryLib from './container/tryLib';
import TryUpgrade from './container/tryUpgrade';
import AlbumMusicPage from './container/albumPage';
import TryMusicplay from './container/tryMusicplay';
import TrySingleMusicPlayer from './container/trySinglePlay';
import TryLiked from './container/tryLikedPlayList';
import TryPrem from './container/trypremium';
import Login from "./components/loginPage"
import Signup from "./components/signUp"
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Link,
  Route, Routes
} from "react-router-dom";
import Spinner from './components/spinner';
import { useEffect, useState } from 'react';


function App() {
  const[userData,setUserData] =useState({});
 
 

  const likedSongArray=[];
  const libraryAlbum=[];
  localStorage.setItem("likedSongArrayUp",JSON.stringify (likedSongArray));
  localStorage.setItem("libraryAlbum", JSON.stringify (libraryAlbum));

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <TryHome />
        </>
      ),
    },
    {
      path: '/explore',
      element: (
        <>
          <TryExplore />
        </>
      ),
    },
    {
      path: '/library',
      element: (
        <>
          <TryLib />
        </>
      ),
    },
    {
      path: '/upgrade',
      element: (
        <>
          <TryUpgrade />
        </>
      ),
    },
    {
      path: '/musiclist',
      element: (
        <>
       
          <AlbumMusicPage />
        </>
      ),
    },
    {
      path: '/musiclist/songplay',
      element: (
        <>
        
          <TryMusicplay />
        </>
      ),
    },
    {
      path: '/explore/songplay',
      element: (
        <>
        
          <TrySingleMusicPlayer />
        </>
      ),
    },
    {
      path: '/LikePlaylist/songplay',
      element: (
        <>
        <TryLiked/>
        </>
      ),
    },
    {
      path: '/login',
      element: (
        <>
        <Login/>
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
        <Signup/>
        </>
      ),
    },
    {
      path: '/premium',
      element: (
        <>
        <TryPrem/>
        </>
      ),
    },
  
  ])
  // <Outlet/>

  return (<>
    <RouterProvider router={router} />
  </>)

}

export default App;
