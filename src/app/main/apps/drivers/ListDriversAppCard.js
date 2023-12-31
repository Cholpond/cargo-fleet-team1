import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { removeDriver, openEditDriverDialog } from './store/driversSlice'; 


const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  email: {
    color: 'blue'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  info: {
    color: "gray"
  },
  
  delete:{
    cursor:"pointer",
    color:"#0F2846",
    marginLeft:"10px",
  },
  edit:{
    cursor:"pointer",
    color:"#0F2846",
    marginLeft:"10px",
  },
  box:{
    display:"flex",
    justifyContent:"space-between",
  }
});

function ListDriverAppCard({ driver }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Memoize the function using useCallback
  const handleEditClick = useCallback((ev) => {
    dispatch(openEditDriverDialog(driver));
  }, [dispatch, driver]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {driver.first_name} {driver.last_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <a href={`mailto:${driver.email}`} id={classes.email}>
            {driver.email}
          </a>
        </Typography>
        <Typography variant="body2" component="p">
          Phone Number: <span className={classes.info}> {driver.phone_number}</span>
        </Typography>
        <br/>
        <div className={classes.box}>
          <Typography variant="body2" component="p" >
            License Number: <span className={classes.info}> {driver.license_number}</span> 
          </Typography> 
          <Delete onClick={() => dispatch(removeDriver(driver.id))} className={classes.delete}/>
          <Edit onClick={handleEditClick} className={classes.edit}/>
        </div>
      </CardContent>
    </Card>
  );
}

export default ListDriverAppCard;
