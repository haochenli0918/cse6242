import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ScoreIcon from '@material-ui/icons/Score';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    MuiOutlinedInput: {
      input: {
          padding: 8,
      },
    }
  }));


export default function ZipCodeItems(props) {
    const classes = useStyles();
    const {state, handleChange} = props;
  
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    
    React.useEffect(() => {
        console.log(inputLabel.current.offsetWidth);
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
  
    return (
      <div>
        <ListSubheader inset>Searching By ZipCode</ListSubheader>
        <ListItem buttion>
        <ListItemIcon>
            <ReportProblemIcon />
          </ListItemIcon>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">All Regions</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            value={state.safety}
            onChange={handleChange}
            inputProps={{
              name: 'ZipCode',
              id: 'zip',
            }}
            labelWidth={labelWidth}
          >
            <MenuItem value={99999}>All Regions</MenuItem>
            <MenuItem value={30030}>30030</MenuItem>
            <MenuItem value={30303}>30303</MenuItem>
            <MenuItem value={30306}>30306</MenuItem>
            <MenuItem value={30307}>30307</MenuItem>
            <MenuItem value={30308}>30308</MenuItem>
            <MenuItem value={30309}>30309</MenuItem>
            <MenuItem value={30310}>30310</MenuItem>
            <MenuItem value={30311}>30311</MenuItem>
            <MenuItem value={30312}>30312</MenuItem>
            <MenuItem value={30313}>30313</MenuItem>
            <MenuItem value={30314}>30314</MenuItem>
            <MenuItem value={30315}>30315</MenuItem>
            <MenuItem value={30316}>30316</MenuItem>
            <MenuItem value={30317}>30317</MenuItem>
            <MenuItem value={30318}>30318</MenuItem>
            <MenuItem value={30324}>30324</MenuItem>
            <MenuItem value={30329}>30329</MenuItem>
            <MenuItem value={30344}>30344</MenuItem>
            <MenuItem value={30354}>30354</MenuItem>
            <MenuItem value={30363}>30363</MenuItem>
          </Select>
          </FormControl>
        </ListItem>
      </div>
    );
  }