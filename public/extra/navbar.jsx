import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { blueGrey } from '@mui/material/colors';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


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



function Navbar() {
    return <>
        <AppBar component="nav"
        className='navigationbar'
            sx={{ backgroundColor: "#090909" }, { height: "10vh" }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2}}
                >
                    <MenuIcon
                    fontSize="large"></MenuIcon>
                </IconButton>
                <Typography
                    className='logo'
                    variant="h6"
                >
                    logo_hai_bhai
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
                    />
                </Search>
                <Box
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}></Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button sx={{ color: '#fff' }}>
                       <TapAndPlayIcon />
                    </Button>
                </Box>
                <Box>
                    <Avatar alt="AYUSH" src="#" />
                </Box>
            </Toolbar>
        </AppBar>
    </>
}
export default Navbar;