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


// const theme = createMuiTheme({
//     overrides: {
//       // Style sheet name 
//       MuiSelect: {
//         // Name of the rule
//         outlined: {
//           // Some CSS
//         //   padding: [8.5, 7],
//         },

//       },
//       MuiOutlinedInput: {
//           input: {
//               padding: "8.5px 12px",
//           },
            
//       },
//       MuiInputBase: {
//           root: {
//             font-size: "0.8em";
//           },
//       },
//       MuiSelect: {
//           icon: {
//               font-size: "1.2em";
//           }
//       }
//     },
//   });

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

export default function MainListItems(props) {
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
      <ListSubheader inset>What is Important</ListSubheader>
      <ListItem buttion>
      <ListItemIcon>
          <ReportProblemIcon />
        </ListItemIcon>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Safety</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          value={state.safety}
          onChange={handleChange('safety')}
          inputProps={{
            name: 'safety',
            id: 'safety-native-simple',
          }}
          labelWidth={labelWidth}
        >
          <MenuItem value={1}>Hightly Important</MenuItem>
          <MenuItem value={0.75}>Very Important</MenuItem>
          <MenuItem value={0.5}>Moderately Important</MenuItem>
          <MenuItem value={0.25}>Slightly Important</MenuItem>
          <MenuItem value={0}>Unimportant</MenuItem>
        </Select>
        </FormControl>
      </ListItem>
      <ListItem buttion>
      <ListItemIcon>
          <LocalDiningIcon />
        </ListItemIcon>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Convenience</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          value={state.convenience}
          onChange={handleChange('convenience')}
          inputProps={{
            name: 'convenience',
            id: 'convenience-native-simple',
          }}
          labelWidth={labelWidth}
        >
          <MenuItem value={1}>Hightly Important</MenuItem>
          <MenuItem value={0.75}>Very Important</MenuItem>
          <MenuItem value={0.5}>Moderately Important</MenuItem>
          <MenuItem value={0.25}>Slightly Important</MenuItem>
          <MenuItem value={0}>Unimportant</MenuItem>
        </Select>
        </FormControl>
      </ListItem>
      <ListItem buttion>
      <ListItemIcon>
          <ScoreIcon />
        </ListItemIcon>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Distance</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          value={state.distance}
          onChange={handleChange('distance')}
          inputProps={{
            name: 'distance',
            id: 'distance-native-simple',
          }}
          labelWidth={labelWidth}
        >
          <MenuItem value={1}>Hightly Important</MenuItem>
          <MenuItem value={0.75}>Very Important</MenuItem>
          <MenuItem value={0.5}>Moderately Important</MenuItem>
          <MenuItem value={0.25}>Slightly Important</MenuItem>
          <MenuItem value={0}>Unimportant</MenuItem>
        </Select>
        </FormControl>
      </ListItem>
      <ListItem buttion>
      <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          value={state.price}
          onChange={handleChange('price')}
          inputProps={{
            name: 'price',
            id: 'price-native-simple',
          }}
          labelWidth={labelWidth}
        >
          <MenuItem value={1}>Hightly Important</MenuItem>
          <MenuItem value={0.75}>Very Important</MenuItem>
          <MenuItem value={0.5}>Moderately Important</MenuItem>
          <MenuItem value={0.25}>Slightly Important</MenuItem>
          <MenuItem value={0}>Unimportant</MenuItem>
        </Select>
        </FormControl>
      </ListItem>
    </div>
  );
}