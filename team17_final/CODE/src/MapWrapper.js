import React, { useState, useEffect } from "react";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ScoreIcon from '@material-ui/icons/Score';

import AssignmentIcon from '@material-ui/icons/Assignment';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";
import * as locationData from "./data/locations.json";
import * as linearModel from "./data/Predict_bed_bath.json";

import mapStyles from "./mapStyles";
import MainListItems from "./MainListItems";
import ZipCodeItems  from "./ZipCodeItems";
import InfoBox from "./InfoBox";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

  export default function MapWrapper(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [rankState, setRankState] = React.useState({
      safety: 1,
      convenience: 1,
      distance: 1,
      price: 1
    });
    const handleRank = name => event => {
      setRankState({
        ...rankState,
        [name]: event.target.value,
      });
    };
 
    const [zipCodeState, setZipCodeState] =  React.useState(99999);
    const handleZipChange = (event) => {
      setZipCodeState(event.target.value);
    };
    function Map() {
      const [selectedLocation, setSelectedLocation] = useState(null);
    
      useEffect(() => {
        const listener = e => {
          if (e.key === "Escape") {
            setSelectedLocation(null);
          }
        };
        window.addEventListener("keydown", listener);
    
        return () => {
          window.removeEventListener("keydown", listener);
        };
      }, []);
      const findDistence = (x1,y1,x2,y2) =>{
        return (x1- x2)*(x1- x2) + (y1- y2)*(y1- y2) 
      }

      var minP = locationData.locations[0].price
      var minD = findDistence(locationData.locations[0].latitude, locationData.locations[0].longitude, 33.771309, -84.392929 )  
      locationData.locations.forEach(
        element => {
          if( (props.bed == 0 || props.bath == 0) || (element.bedrooms == props.bed && element.bathrooms == props.bath)){
            var currentDistence = findDistence(element.latitude, element.longitude, 33.771309, -84.392929 )
            if(element.price < minP) minP = element.price;
            if(currentDistence < minD) minD = currentDistence;    
          }
            
        }
      );
      var maxR =  0
      locationData.locations.forEach(
        element => {
          if( (props.bed == 0 || props.bath == 0) || (element.bedrooms == props.bed && element.bathrooms == props.bath)){
            var currentRate = rankState['convenience'] * element.yelp_rating +
            rankState['safety'] * element.crime_rating+
            (minP * 1.0 / element.price ) * 100 * rankState['price'] +
            (minD * 1.0 / findDistence(element.latitude, element.longitude, 33.771309, -84.392929 )) * 100 * rankState['distance']
            if(currentRate > maxR) maxR = currentRate;
          }
        }
      );

      const findScore = (location) =>{
        var pScore =(minP * 1.0 / location.price ) * 100;
        var dScore =(minD * 1.0 / findDistence(location.latitude, location.longitude, 33.771309, -84.392929 )) * 100;
        var score = (  (rankState['convenience'] * location.yelp_rating +
        rankState['safety'] * location.crime_rating+
        pScore * rankState['price'] +
        dScore * rankState['distance']) / maxR ) * 100

        if( score < 15.0 ) return '/one.png';
        else if( score < 25.0) return '/two.png';
        else if( score < 35.0) return '/three.png';
        else if( score < 45.0) return '/four.png';
        else if( score < 55.0) return '/five.png';
        else if( score < 65.0) return '/six.png';
        else if( score < 75.0) return '/seven.png';
        else if( score < 85.0) return '/eight.png';
        else if( score < 95.0) return '/nine.png';
        else return '/ten.png';
      }
     
      return (
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 33.771309, lng: -84.392929 }}
        >
          {locationData.locations.map(location => (
            (zipCodeState ==  99999 || parseInt(location.zipcode ) == zipCodeState 
            ) && ((props.bed == 0 || props.bath == 0) || (location.bedrooms == props.bed && location.bathrooms == props.bath))&&
            <Marker
              key={location.uid}
              position={{
                lat: location.latitude,
                lng: location.longitude
              }}
              onClick={() => {
                setSelectedLocation(location);
              }}
              icon={{
                url: findScore(location),
                scaledSize: new window.google.maps.Size(15,15)
              }}
            />
          ))}
    
          {selectedLocation && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedLocation(null);
              }}
              position={{
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude
              }}
            >
              <InfoBox name = {selectedLocation.name}
                       uid = {selectedLocation.uid}
                       address = {selectedLocation.address}
                       bed = {selectedLocation.bedrooms}
                       bath = {selectedLocation.bathrooms}
                       Sqft = {selectedLocation.Sqft}
                       price = {selectedLocation.price}
                       safety = {Math.round(selectedLocation.crime_rating)}
                       convience = {Math.round(selectedLocation.yelp_rating)}
                       link = {selectedLocation.link}
                       selectedLocation = {selectedLocation}
                       setSelectedLocation = {setSelectedLocation}
                       zipCodeState= {zipCodeState}
                       setZipCodeState = {setZipCodeState}/>
            </InfoWindow>
          )}
        </GoogleMap>
      );
    }
    const getHeaderText = () =>{
      
      if (props.bath == 0 || props.bed == 0 )return "Dashboard"
      var unit = props.bed + "bed/" + props.bath + "bath"
      if (zipCodeState == 99999) return unit + " in all regions"
      else {
        var co_bed = 0
        var co_bath = 0
        for(var i = 0; i < 20; i ++){
            if(linearModel.default[i].zipcode == zipCodeState){
              co_bed = linearModel.default[i].co_bedrooms
              co_bath = linearModel.default[i].co_bathrooms
            }
        }
      
        return unit + " in " + zipCodeState + " region will run you about " + parseInt(props.bed*co_bed + props.bath*co_bath) + " dollars"
      }
    };
    const MapWrapped = withScriptjs(withGoogleMap(Map));
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}  width="175%">
          <Toolbar className={classes.toolbar} width="175%">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {getHeaderText()}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {/* <List>{mainListItems}</List> */}
          <MainListItems state = {rankState} handleChange = {handleRank}/>
          <Divider />
          {/* <List>{secondaryListItems}</List> */}
          <ZipCodeItems state = {zipCodeState} handleChange = {handleZipChange}/>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
       />
      </div>
        
        </main>
      </div>
    );
  } 
  

  