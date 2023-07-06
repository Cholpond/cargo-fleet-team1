
import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { removeissue, openEditIssueDialog } from './store/issuesSlice';

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
    color: 'gray'
  },

  delete: {
    cursor: 'pointer',
    color: 'gray',
    marginLeft: '10px'
  },
  box: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

// 7 css framework material ui ready style
function ListissueAppCard({ issue }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(issue);

  const handleEditClick = useCallback(
    ev => {
      dispatch(openEditIssueDialog(issue));
    },
    [dispatch, issue]
  );

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography>
          Vehicle: {`${issue.vehicle.brand} | ${issue.vehicle.model} | ${issue.vehicle.plate_number}  `}
        </Typography>
        <Typography>Title: {issue.title} </Typography>
        <Typography>Description: {issue.description}</Typography>
        <Typography>Due Date: {issue.due_date}</Typography>
        <Typography>Priority: {issue.priority}</Typography>
        <hr />
        <br />

        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          {issue.first_name} {issue.last_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <a href={`mailto:${issue.email}`} id={classes.email}>
            {issue.email}
          </a>
        </Typography>
        <Typography variant="body2" component="p">
          Phone Number: <span className={classes.info}> {issue.phone_number}</span>
        </Typography>
        <br />
        <div className={classes.box}>
          <Typography variant="body2" component="p">
            License Number: <span className={classes.info}> {issue.license_number}</span>
          </Typography> */}
        <div className={classes.box}>
          <Button color="secondary" variant="contained" onClick={() => dispatch(removeissue(issue.id))}>
            DELETE
            <Delete className={classes.delete} />
          </Button>
          <Button onClick={handleEditClick} variant="contained" color="primary">
            EDIT
            <Edit className={classes.edit} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ListissueAppCard;
