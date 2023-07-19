
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FuseUtils from '@fuse/utils/FuseUtils';
import { getdrivers, selectdrivers } from './store/driversSlice';
import ListdriversAppCard from './ListdriverAppCard';

const useStyles = makeStyles({
  issue: {
    padding: '27px',
    marginBottom: '27px'
  },

  pagination: {
    float: 'right',
    marginRight: '15px'
  },

  content: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    padding: '50px 20px',
    justifyContent: 'center'
  }
});

//6 itterate issues from inside store issues.map
function ListdriversAppContent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const drivers = useSelector(selectdrivers);
  const [filteredData, setFilteredData] = useState(null);
  const searchText = useSelector(({ listdriversApp }) => listdriversApp.drivers.searchText);

  function handleChangePage(a, number) {
    setPage(number);
  }

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return drivers;
      }
      return FuseUtils.filterArrayByString(drivers, _searchText);
    }

    if (drivers) {
      setFilteredData(getFilteredArray(drivers, searchText));
    }
  }, [drivers, searchText]);

  useEffect(() => {
    dispatch(getdrivers(page)());
  }, [dispatch, page]);

  if (filteredData?.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          No drivers!
        </Typography>
      </div>
    );
  }
  return (
    <div className={classes.driver}>
    <h2>Drivers</h2>
    <hr />
    <div className={classes.content}>
      {filteredData?.map(eachDriver => (
        <ListdriversAppCard driver={eachDriver} key={eachDriver.id} />
      ))}
    </div>

      {/* 10 add pogination */}
      <Pagination
        count={3}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
        className={classes.pagination}
      />
    </div>
  );
}
export default ListdriversAppContent;