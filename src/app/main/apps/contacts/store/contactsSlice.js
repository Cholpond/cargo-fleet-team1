import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';
import { getContacts } from '../../chat/store/contactsSlice';

export const getVehicles = createAsyncThunk(
  'vehicle-list-app/vehicles/getVehicles',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().contactsApp.contacts.routeParams;
    const response = await axios.get('https://cargofleet-api.fly.dev/team1/api/vehicles', {
      params: routeParams
    });
    const data = await response.data.data;

    return { data, routeParams };
  }
);

export const addContact = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (contact, { dispatch, getState }) => {
    console.log('contact', contact);
    const response = await axios.post('https://cargofleet-api.fly.dev/team1/api/vehicles', contact);

    const data = await response.data;

    dispatch(getVehicles(1));

    return data;
  }
);

export const updateContact = createAsyncThunk(
  'contactsApp/contacts/updateContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.put(`https://cargofleet-api.fly.dev/team1/api/vehicles/${contact.id}`, contact);
    // console.log('contact', contact);
    const data = await response.data;

    dispatch(getVehicles());

    return data;
  }
);

export const removeContact = createAsyncThunk(
  'contactsApp/contacts/removeContact',
  async (contactId, { dispatch, getState }) => {
    await axios.delete(`https://cargofleet-api.fly.dev/team1/api/vehicles/${contactId}`);

    return contactId;
  }
);

export const removeContacts = createAsyncThunk(
  'contactsApp/contacts/removeContacts',
  async (contactIds, { dispatch, getState }) => {
    await axios.post('/api/contacts-app/remove-contacts', { contactIds });

    return contactIds;
  }
);

export const toggleStarredContact = createAsyncThunk(
  'contactsApp/contacts/toggleStarredContact',
  async (contactId, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/toggle-starred-contact', { contactId });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const toggleStarredContacts = createAsyncThunk(
  'contactsApp/contacts/toggleStarredContacts',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsStarred = createAsyncThunk(
  'contactsApp/contacts/setContactsStarred',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/set-contacts-starred', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsUnstarred = createAsyncThunk(
  'contactsApp/contacts/setContactsUnstarred',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
); 

//7 reguest data to send to server for assign/unassign drivers
export const setAssignDriver = createAsyncThunk(
  'contactsApp/contacts/setAssign',
  async (object, { dispatch, getState }) => {
    const response = await axios.post(`https://cargofleet-api.fly.dev/team1/api/vehicles/${object.id}/assign`, object.assign);
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getVehicles());
    dispatch(getContacts());

    return data;
  }
);
export const setUnAssignDriver = createAsyncThunk(
  'contactsApp/contacts/setAssign',
  async (object, { dispatch, getState }) => {
    const response = await axios.post(`https://cargofleet-api.fly.dev/team1/api/vehicles/${object.id}/unassign`, object.assign);
    const data = await response.data;

    dispatch(getUserData());
    dispatch(getVehicles());
    dispatch(getContacts());

    return data;
  }
);



const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
  state => state.contactsApp.contacts
);

const contactsSlice = createSlice({
  name: 'contactsApp/contacts',
  initialState: contactsAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    contactDialog: {
      type: 'new',
      props: {
        open: false
      },
      data: null
    }, 

    //2 add initally state for assignDialog/unassignDialog
    assignDialog: {
      type: 'assign',
      props: {
        open: false
      },
      data: null
    }
  }),
  reducers: {
    //1 create open and close assign and unassign
    openAssignDialog: (state, action) => {
      state.assignDialog = {
        type: 'assign',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeAssignDialog: (state, action) => {
      state.assignDialog = {
        type: 'assign',
        props: {
          open: false
        },
        data: null
      };
    },
    openUnassignDialog: (state, action) => {
      state.assignDialog = {
        type: 'unassign',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeUnassignDialog: (state, action) => {
      state.assignDialog = {
        type: 'unassign',
        props: {
          open: false
        },
        data: null
      };
    },
    setContactsSearchText: {
      reducer: (state, action) => {

        state.searchText = action.payload;
      },
      prepare: event => ({ payload: event.target.value || '' })
    },
    openNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: true
        },
        data: null
      };
    },
    closeNewContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'new',
        props: {
          open: false
        },
        data: null
      };
    },
    openEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeEditContactDialog: (state, action) => {
      state.contactDialog = {
        type: 'edit',
        props: {
          open: false
        },
        data: null
      };
    }
  },
  extraReducers: {
    [updateContact.fulfilled]: contactsAdapter.upsertOne,
    [addContact.fulfilled]: contactsAdapter.addOne,
    [removeContacts.fulfilled]: (state, action) => contactsAdapter.removeMany(state, action.payload),
    [removeContact.fulfilled]: (state, action) => contactsAdapter.removeOne(state, action.payload),
    [setAssignDriver.fulfilled]: contactsAdapter.addOne,
    [setUnAssignDriver.fulfilled]: contactsAdapter.addOne,
    [getVehicles.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    }
  }
});

//3
export const {
  setContactsSearchText,
  openNewContactDialog,
  closeNewContactDialog,
  openEditContactDialog,
  closeEditContactDialog,
  openAssignDialog,
  closeAssignDialog,
  openUnassignDialog,
  closeUnassignDialog
} = contactsSlice.actions;



export default contactsSlice.reducer;

