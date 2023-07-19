
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getdrivers = 
    createAsyncThunk('listdriversApp/drivers/getdrivers', async () => {
    const response = await axios.get(`https://cargofleet-api.fly.dev/team1/api/drivers`);
    return response.data;
  });


export const addNewDriver = createAsyncThunk(
  'listdriversApp/drivers/addNewDriver',
  async (driver, { dispatch, getState }) => {
    // delete issue.id;

    console.log(driver);
    const response = await axios.post('https://cargofleet-api.fly.dev/team1/api/drivers', driver);
    const data = await response.data;

    dispatch(getdrivers(1));

    return data;
  }
);

export const updateDriver = createAsyncThunk(
  'listdriversApp/drivers/updateDriver',
  async (driver, { dispatch, getState }) => {
    const response = await axios.put(`https://cargofleet-api.fly.dev/team1/api/drivers/${driver.id}`, driver);
    const data = await response.data;

    // dispatch(getdrivers(1));
    return data;
  }
);

export const removedriver = createAsyncThunk(
  'listdriversApp/drivers//removedriver',
  async (contactId, { dispatch, getState }) => {
    await axios.delete(`https://cargofleet-api.fly.dev/team1/api/drivers/${contactId}`);

    return contactId;
  }
);

const driversAdapter = createEntityAdapter({});
export const { selectAll: selectdrivers, selectById: selectdriversById } = driversAdapter.getSelectors(
  state => state.listdriversApp.drivers
);
const driverSlice = createSlice({
  name: 'listdriversApp/drivers',
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
    setdriverSearchText: {
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
    [getdrivers.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      driversAdapter.setAll(state, data);
    },
    [updateDriver.fulfilled]: driversAdapter.upsertOne,
    [removedriver.fulfilled]: (state, action) => driversAdapter.removeOne(state, action.payload),
    [addNewDriver.fulfilled]: driversAdapter.addOne
  }
});

export const { setdriverSearchText, openNewDriverDialog, closeNewDriverDialog, openEditDriverDialog } = driverSlice.actions;

export default driverSlice.reducer;
