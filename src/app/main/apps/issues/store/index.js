
import { combineReducers } from '@reduxjs/toolkit';
import issues from './issuesSlice';

const issuesReducer = combineReducers({ issues });

export default issuesReducer;