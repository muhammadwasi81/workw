import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { API } from '../../../utils/services';
import { useParams } from 'react-router-dom';


const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


export default function AcceptingResponse({isAcceptingResponse}) {
  const [isChecked, setIsChecked] = React.useState(false);
  let {id} = useParams()
  useEffect(()=>{
    setIsChecked(isAcceptingResponse)
  }, [isAcceptingResponse])
  const handleChange = (e) =>{
    setIsChecked(e.target.checked);
    API.FORM.UpdateAcceptingResponse(id, e.target.checked).then(({status, data, error})=>{
      setIsChecked(data);
    })
  }
  return (
    <div style={{marginLeft:"auto"}} >
      <label style={{marginRight:"10px"}} >Accepting Response</label>
      <FormControlLabel
        control={<IOSSwitch checked={isChecked} onChange={handleChange} name="checkedB" />}
        // label="iOS style"
      />
      </div>
  );
}