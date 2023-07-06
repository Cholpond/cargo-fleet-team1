//https://cargofleet-api.fly.dev/team1/api/

import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getdashBoard = createAsyncThunk('projectDashboardApp/dashboard/getdashBoard', async ()=> {
    const response = await axios.get('https://cargofleet-api.fly.dev/team1/api/dashboard');
    console.log(response.data);
    return response.data;
});

const dashBoardSlice = createSlice({
    name: 'projectDashboardApp/dashboard',
    initialState: {},
    reducer: {},
    extraReducers: {
        [getdashBoard.fulfilled]: (state, action) => action.payload
    }
});

export default dashBoardSlice.reducer;