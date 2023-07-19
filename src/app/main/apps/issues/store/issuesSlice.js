
// 5 add reducers-will save data that we get from server API
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export function getissues(page) {
  return createAsyncThunk('listissuesApp/issues/getissues', async () => {
    const response = await axios.get(`https://cargofleet-api.fly.dev/team1/api/issues?page=${page}`);
    return response.data;
  });
}

export const addNewissue = createAsyncThunk(
  'listissuesApp/issues/addNewissue',
  async (issue, { dispatch, getState }) => {
    // delete issue.id;

    console.log(issue);
    const response = await axios.post('https://cargofleet-api.fly.dev/team1/api/issues', issue);
    const data = await response.data;

    dispatch(getissues(1));

    return data;
  }
  
);

export const updateIssue = createAsyncThunk(
  'listissuesApp/issues/updateIssue',
  async (issue, { dispatch, getState }) => {
    const response = await axios.put(`https://cargofleet-api.fly.dev/team1/api/issues/${issue.id}`, issue);
    const data = await response.data;

    dispatch(getissues(1));
    return data;
  }
);

export const removeissue = createAsyncThunk(
  'listissuesApp/issues//removeissue',
  async (contactId, { dispatch, getState }) => {
    await axios.delete(`https://cargofleet-api.fly.dev/team1/api/issues/${contactId}`);

    return contactId;
  }
);

const issuesAdapter = createEntityAdapter({});
export const { selectAll: selectissues, selectById: selectissuesById } = issuesAdapter.getSelectors(
  state => state.listissuesApp.issues
);
const issueSlice = createSlice({
  name: 'listissuesApp/issues',
  initialState: issuesAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    issueDialog: {
      type: 'new',
      props: {
        open: false
      },
      data: null
    }
  }),

  reducers: {
    setissueSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: event => ({ payload: event.target.value || '' })
    },
    openNewissueDialog: (state, action) => {
      state.issueDialog = {
        type: 'new',
        props: {
          open: true
        },
        data: null
      };
    },
    openEditIssueDialog: (state, action) => {
      state.issueDialog = {
        type: 'edit',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeNewissueDialog: (state, action) => {
      state.issueDialog = {
        type: 'new',
        props: {
          open: false
        },
        data: null
      };
    }
  },
  extraReducers: {
    [getissues().fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      issuesAdapter.setAll(state, data);
    },
    [updateIssue.fulfilled]: issuesAdapter.upsertOne,
    [removeissue.fulfilled]: (state, action) => issuesAdapter.removeOne(state, action.payload),
    [addNewissue.fulfilled]: issuesAdapter.addOne
  }
});

export const { setissueSearchText, openNewissueDialog, closeNewissueDialog, openEditIssueDialog } = issueSlice.actions;

export default issueSlice.reducer;
