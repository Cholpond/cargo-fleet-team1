import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog
} from './store/contactsSlice';

const defaultValues = {
  id: '',
  brand: '',
  model: '',
  manufacture_year: '',
  color: '',
  image_url: 'assets/images/avatars/profile.jpg',
  plate_number: '',
  engine_number: '',
  fuel_type: 'diesel',
  active: true
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  brand: yup.string().required('You must enter a name')
});

function ContactDialog(props) {
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (contactDialog?.type === 'edit' && contactDialog?.data) {
      reset({ ...defaultValues, ...contactDialog?.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog?.type === 'new') {
      reset({
        ...defaultValues,
        ...contactDialog?.data,
        id: FuseUtils.generateGUID()
      });
    }
  }, [contactDialog?.data, contactDialog?.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog?.props.open) {
      initDialog();
    }
  }, [contactDialog?.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return contactDialog?.type === 'edit' ? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog?.type === 'new') {
      dispatch(addContact(data));
    } else {
      dispatch(updateContact({ ...contactDialog?.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24'
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === 'new' ? 'New Vehicle' : 'Edit Vehicle'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="contact avatar" src={avatar} />
          {contactDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
      </AppBar>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">{/* <Icon color="action">DriveEtaIcon</Icon> */}</div>
            <Controller
              control={control}
              name="brand"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Vehicle Brand"
                  id="brand"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20" />

            <Controller
              control={control}
              name="model"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Model" id="model" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">{/* <Icon color="action">star</Icon> */}</div>
            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Color" id="color" variant="outlined" fullWidth />
              )}
            />
          </div>

          {/* <div className="flex">
>>>>>>> development
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <Controller
              control={control}

              
              name="manufactured_year"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Manufactured Year"
                  id="manufactured_year"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div> */}

          <div className="flex">
            <div className="min-w-48 pt-20">{/* <Icon color="action">email</Icon> */}</div>
            <Controller
              control={control}
              name="plate_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Plate Number"
                  id="plate_number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">{/* <Icon color="action">domain</Icon> */}</div>
            <Controller
              control={control}
              name="engine_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Engine Number"
                  id="engine_number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">{/* <Icon color="action">work</Icon> */}</div>
            <Controller
              control={control}
              name="fuel_type"
              render={({ field }) => (
                <FormControl sx={{ m: 1, minWidth: 340 }} variant="outlined">
                  <InputLabel id="demo-simple-select-helper-label">Fuel type</InputLabel>
                  <Select
                    label="fueltype"
                    id="fuel_type demo-simple-select-helper"
                    name="fuel_type"
                    className="mb-24"
                    style={{ width: '340px' }}
                    {...field}
                    labelId="demo-simple-select-helper-label"
                  >
                    <MenuItem value="diesel">Diesel</MenuItem>
                    <MenuItem value="gasoline">Gasoline</MenuItem>
                    <MenuItem value="gasoline">Natural gas</MenuItem>
                    <MenuItem value="gasoline">Propane</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">{/* <Icon color="action">cake</Icon> */}</div>
            <Controller
              control={control}
              name="manufacture_year"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  id="manufacture_year"
                  label="Manufacture Year"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          {/* 
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Address" id="address" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Notes"
                  id="notes"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                />
              )}
            />
          </div> */}
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove}>
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default ContactDialog;
