import { Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { openNewissueDialog, setissueSearchText } from './store/issuesSlice';

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

function ListissuesSide() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchText = useSelector(store => store.listissuesApp.issues.searchText);
  return (
    <>
      <div className={classes.search}>
        <Typography variant="h3" style={{ marginRight: '30px' }}>
          Issues
        </Typography>
        <Button
          style={{ width: '300px', backgroundColor: '#006565' }}
          onClick={() => dispatch(openNewissueDialog())}
          variant="contained"
          color="secondary"
        >
          <Typography style={{ color: 'white' }}>Add New Issue</Typography>
        </Button>
        <input
          id="outlined-basic"
          placeholder="Search..."
          value={searchText}
          className={classes.inputSearch}
          onChange={e => dispatch(setissueSearchText(e))}
        />
      </div>
      <hr />
    </>
  );
}

export default ListissuesSide;
