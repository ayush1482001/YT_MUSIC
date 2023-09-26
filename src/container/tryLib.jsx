import * as React from 'react';
import "../styles/try.css";
import "../styles/subnav.css";
import Home from '../components/home';
import ytlogo from '../assets/logo.svg'
import { useState, useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Margin, Upgrade } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
//=================================
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import Subnav from '../components/subnav';
import { useDispatch } from 'react-redux'
import Library from '../components/library';
import Upgradee from '../components/upgrade';
import Explore from '../components/explore';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButt'
import Avtr from '../components/avtr';
import {
    createBrowserRouter,
    RouterProvider,
    BrowserRouter,
    Link,
    Route, Routes
} from "react-router-dom";
import Badge from '@mui/material/Badge';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const drawerWidth = 240;
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),

        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function TryLib() {
    const userrData = JSON.parse(localStorage.getItem('loginStatus'));
    const navigate = useNavigate();
    const menuSt = useRef(false);
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();
    const [main_router_val, setMainVal] = useState("Home");
    const frontRtReducer = {
        type: "fp_routeVal",
        payload: main_router_val,
    }
    useEffect(() => {
        if (window.innerWidth <= 1000) {
            setOpen(false);
            menuSt.current = true;
          } 
        dispatch(frontRtReducer);

    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
        menuSt.current = false;

    };

    const handleDrawerClose = () => {
        setOpen(false);
        menuSt.current = true;
    };

    return (
        <Box className="homeContainer">
            <CssBaseline />
            <AppBar className='appbar' position="fixed" open={open} sx={{ background: "black" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap component="div">
                        {menuSt.current ? <img className="logosecond" src={ytlogo} onClick={()=>{navigate('/')}} alt="logo" /> : null}
                    </Typography>
                    <Search className='searchInput'
                    >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            className='inp'
                            placeholder="Search songs, albums, artists, podcasts"
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{ overflow: 'hidden' }}
                        />
                    </Search>
                    <Box
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}></Box>
                    
                    <Box>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant={userrData?.status == "success" ? "dot" : null}
                        >
                           <Avtr userrData={userrData}/> 
                        </StyledBadge>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer className='drawer' variant="permanent" open={open}>
                <DrawerHeader className='DrawerHead' >
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon className='menuIcon' />
                    </IconButton>
                    <Box className="logo"><img src={ytlogo} onClick={()=>{navigate('/')}} alt="logo" /></Box>
                </DrawerHeader>
                <List className='mainList'>
                    <ListItem key={'Home'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => {
                                setMainVal('Home');
                                navigate('/');
                            }}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: 'white',
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <HomeIcon />

                            </ListItemIcon>
                            <ListItemText primary={'Home'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'Explore'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => {
                                setMainVal('Explore');
                                navigate('/explore');

                            }}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: 'white',
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >

                                <ExploreIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Explore'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'Library'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => {
                                setMainVal('Library');
                                navigate('/library');
                            }}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: 'white',
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <LibraryMusicIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Library'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'Upgrade'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => {
                                setMainVal('Upgrade');
                                navigate('/upgrade');

                            }}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: 'white',
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <PlayCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Upgrade'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <div className="divider"><Divider /></div>
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', background: 'black' }}>


                    <LoginButton st={menuSt} />


                </Box>


            </Drawer>
            <Box component="main" className='db' sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

                <Box className='home-container'>

                    <Library />

                </Box>
            </Box>
        </Box>
    );
}
