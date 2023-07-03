
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@material-ui/core';
import FuseUtils from '@fuse/utils/FuseUtils';
import { useDispatch, useSelector } from 'react-redux';
import { getissues, selectissues } from './store/issuesSlice';
import ListissuesAppCard from './ListIssuesAppCard';

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
function ListissuesAppContent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const issues = useSelector(selectissues);
  const [filteredData, setFilteredData] = useState(null);
  const searchText = useSelector(({ listissuesApp }) => listissuesApp.issues.searchText);

  function handleChangePage(a, number) {
    setPage(number);
  }

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return issues;
      }
      return FuseUtils.filterArrayByString(issues, _searchText);
    }

    if (issues) {
      setFilteredData(getFilteredArray(issues, searchText));
    }
  }, [issues, searchText]);

  useEffect(() => {
    dispatch(getissues(page)());
  }, [dispatch, page]);

  if (filteredData?.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no issues!
        </Typography>
      </div>
    );
  }
  return (
    <div className={classes.issue}>
      <div className={classes.content}>
        {filteredData?.map(eachissue => (
          <ListissuesAppCard issue={eachissue} key={eachissue.id} />
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
export default ListissuesAppContent;
