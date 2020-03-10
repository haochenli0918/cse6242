
import React, { useState, useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import HelpOutlineIcon from '@material-ui/icons/Help';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MapWrapper from './MapWrapper';
import ReactDOM from 'react-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://poloclub.github.io/cse6242-2019fall-campus/">
        CSE6242
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function App() {
  const classes = useStyles();
  const [bed, setBed] = useState(0);
  const [bath, setBath] = useState(0);
  function handleBedFieldChange(event) {
    setBed(event.target.value);
  }
  function handleBathFieldChange(event) {
    setBath( event.target.value);
  }
  function onClick(){
    ReactDOM.render(<MapWrapper bed = {bed} bath = {bath}/>, document.getElementById('root'))
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HelpOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Tell Us What You're Looking For ~
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="bed"
              label="Number of Bedrooms"
              name="bed"
              autoFocus
              onChange = {handleBedFieldChange} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="bath"
              label="Number of Bathrooms"
              id="bath"
              onChange = {handleBathFieldChange} 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClick}
            >
              Let's go!
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
  
}

