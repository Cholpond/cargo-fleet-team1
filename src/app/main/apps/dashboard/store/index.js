import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import dashboard from './dashBoardSlice';

const reducer = combineReducers({
  widgets,
  projects,
  dashboard
});

export default reducer;
