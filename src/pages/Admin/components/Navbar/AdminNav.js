import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import './styles.scss'
import { useHistory, Link } from 'react-router-dom';
import {IoMdArrowDropdown} from 'react-icons/io'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#141B2D'

  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#141B2D'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
      width: drawerWidth,
      background: '#1F2940',
      color: '#FFFFFF'
  },
  drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
    height: '100vh',
    background: '#141B2D',
    overflowY: 'auto',

        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function AdminNav ({children}) {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const menuItems = [
        {
            text: 'Users',
            icon: MailIcon,
            onClick: () => history.push("/"),
        },
        {
            text: 'Products',
            icon: MailIcon,
            onClick: () => history.push("/"),
        },
        {
            text: 'Orders',
            icon: MailIcon,
            onClick: () => history.push("/"),
        },
    ]
    
    return (
        <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        {/* NavBar */}
        <div className="navNemu">
            <div className="backSearch">
              <input type="text" placeholder="Search" />
              <div className="circleSearch"> &#x2192; </div>
            </div>
            <div>
                 <div className="profil">
                    <img className="profilImage" src="https://conteudo.imguol.com.br/c/noticias/c2/2021/07/07/moise-jovenel-presidente-do-haiti-1625654124903_v2_1920x1401.jpg" alt="" />
                    <h5 className="Name">Mackender  Pierre</h5>
                 </div>
            </div>
        </div>
        {/* NavBar fim*/}

        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button  onClick={() => history.push("/category")}>
              <ListItemIcon><InboxIcon /> </ListItemIcon> General
            </ListItem>
        </List>


            <a href="#submenu1"  data-toggle="collapse" aria-expanded="false" className="sidebar__dropdown text-white" button>
                <List>
                    <ListItem>
                        <ListItemIcon><InboxIcon /> </ListItemIcon>
                        <span className="text-white">Register</span> <IoMdArrowDropdown size="20" color="white"/>
                    </ListItem>
                </List>
            </a>
              <div id='submenu1' className="collapse sidebar__submenu text-center">
                <a href="/admin/category" className="list-group-item list-group-item-action bg-dark text-white">
                  <span className="menu-collapsed"> Categories</span>
                </a>

                <a href="/admin/sub-category" className="list-group-item list-group-item-action bg-dark text-white">
                  <span className="menu-collapsed">Subcategories</span>
                </a>
                <a href="/adm/agent" className="list-group-item list-group-item-action bg-dark text-white">
                  <span className="menu-collapsed">Admin</span>
                </a>
              </div>
        
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
       {children}
      </main>
    </div>
    )
}
