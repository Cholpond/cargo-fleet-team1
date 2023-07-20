import { combineReducers } from '@reduxjs/toolkit';
import drivers from './driversSlice';

const driversReducer = combineReducers({ drivers });

export default driversReducer;
