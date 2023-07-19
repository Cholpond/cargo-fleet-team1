
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { openNewDriverDialog, setdriverSearchText, openEditDriverDialog } from './store/driversSlice';

const useStyles = makeStyles(() => ({
  search: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '25px 50px 10px 50px'
  },
  inputSearch: {
    minWidth: '250px',
    borderRadius: '25px',
    padding: '8px 20px',
    border: '1px solid gray',
    background: 'transparent',
    marginLeft: '20px'
  }
}));

function ListDriversSide() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchText = useSelector(store => store.listDriversApp.drivers.searchText);
  return (
    <div className={classes.search}>
      <Button onClick={() => dispatch(openNewDriverDialog())} variant="contained" color='secondary'>
        Add New Drivers
      </Button>
      <input
        id="outlined-basic"
        placeholder="Search..."
        value={searchText}
        className={classes.inputSearch}
        onChange={e => dispatch(setdriverSearchText(e))}
      />
    </div>
  );
}

export default ListDriversSide;
