
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


export const getDrivers = createAsyncThunk('listdriversApp/drivers/getDrivers', 
    async () => {
    const response = await axios.get(`https://cargofleet-api.fly.dev/team1/api/drivers`);
    const data = await response.data
    return response.data;
  });
  
  console.log(getDrivers())
  
 

export const addNewDriver = createAsyncThunk(
  'listDriversApp/drivers/addNewDriver',
  async (driver, { dispatch, getState }) => {
    // delete issue.id;

    //console.log(driver);
    const response = await axios.post('https://cargofleet-api.fly.dev/team1/api/drivers', driver);
    const data = await response.data;

    dispatch(getDrivers());

    return data;
  }
);

export const updateDriver = createAsyncThunk(
  'listdriversApp/drivers/updateDriver',
  async (driver, { dispatch, getState }) => {
    const response = await axios.put(`https://cargofleet-api.fly.dev/team1/api/drivers/${driver.id}`, driver);
    const data = await response.data;
     //dispatch(getdrivers());
    return data;
    //console.log(driver),
    //console.log(data)
  }

);

export const removeDriver = createAsyncThunk(
  'listdriversApp/drivers/removeDriver',
  async (contactId, { dispatch, getState }) => {
    await axios.delete(`https://cargofleet-api.fly.dev/team1/api/drivers/${contactId}`);

    return contactId;
  }
);

const driversAdapter = createEntityAdapter({});
export const { selectAll: selectDrivers, selectById: selectDriversById } = driversAdapter.getSelectors(
  state => state.listDriversApp.drivers
);
const driversSlice = createSlice({
  name: 'listDriversApp/drivers',
  initialState: driversAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    driverDialog: {
      type: 'new',
      props: {
        open: false
      },
      data: null
    }
  }),

  reducers: {
    setDriverSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: event => ({ payload: event.target.value || '' })
    },
    openNewDriverDialog: (state, action) => {
      state.driverDialog = {
        type: 'new',
        props: {
          open: true
        },
        data: null
      };
    },
    openEditDriverDialog: (state, action) => {
      state.driverDialog = {
        type: 'edit',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeNewDriverDialog: (state, action) => {
      state.driverDialog = {
        type: 'new',
        props: {
          open: false
        },
        data: null
      };
    }
  },
  extraReducers: {
    [updateDriver.fulfilled]: driversAdapter.upsertOne,
    [getDrivers.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      driversAdapter.setAll(state, data);
    },
    [removeDriver.fulfilled]: (state, action) => driversAdapter.removeOne(state, action.payload),
    [addNewDriver.fulfilled]: driversAdapter.addOne
  }
});

export const { setDriverSearchText, openNewDriverDialog, closeNewDriverDialog, openEditDriverDialog } = driversSlice.actions;

export default driversSlice.reducer;
