
import {
    Dialog,
    DialogContent,
    makeStyles,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem
  } from '@material-ui/core';
  import AppBar from '@material-ui/core/AppBar';
  import TextField from '@material-ui/core/TextField';
  import Avatar from '@material-ui/core/Avatar';
  import Toolbar from '@material-ui/core/Toolbar';
  import Typography from '@material-ui/core/Typography';
  import { useDispatch, useSelector } from 'react-redux';
  import * as yup from 'yup';
  import { Controller, useForm } from 'react-hook-form';
  import { yupResolver } from '@hookform/resolvers/yup';
  import { useCallback, useEffect } from 'react';
  import FuseUtils from '@fuse/utils/FuseUtils';
  import name from 'keycode';
  import _ from 'lodash';
  import { addNewDriver, closeNewDriverDialog, updateDriver } from './store/driversSlice';
  
  const defaultValues = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    city: ''
  };
  const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().required(),
    phone_number: yup.string().required(),
    city: yup.string().required()
  });
  
  const useStyles = makeStyles(() => ({
    inputInformation: {},
  
    textfield: {
      width: '100%',
      margin: '7px 0'
    },
    content: {
      width: '400px',
      overflow: 'scroll',
      height: '700px'
    },
    button: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    }
  }));
  
  function driversDialog() {
    const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema)
    });
  
    const classes = useStyles();
    const dispatch = useDispatch();
    const driverDialog = useSelector(store => store.listDriversApp.drivers.driverDialog);
  
    const { isValid, dirtyFields, errors } = formState;
  
    const initDialog = useCallback(() => {
      if (driverDialog?.type === 'edit' && driverDialog?.data) {
        reset({ ...driverDialog?.data });
      }
      if (driverDialog?.type === 'new') {
        reset({
          ...defaultValues,
          ...driverDialog?.data,
          id: FuseUtils.generateGUID()
        });
      }
    }, [driverDialog?.data, driverDialog?.type, reset]);
  
    function closeDialog() {
      dispatch(closeNewDriverDialog());
    }
  
    useEffect(() => {
      if (driverDialog?.props.open) {
        initDialog();
      }
    }, [driverDialog?.props.open, initDialog]);
  
    function submit(data) {
      if (driverDialog?.type === 'new') {
       'dispatch(addNewDriver(data));'
      } else {
        dispatch(updateDriver({ ...driverDialog?.data, ...data }));
      }
      closeDialog();
    }
  
    // const drivers = useSelector(state => state.listdriversApp.drivers.entities);
    // const driversCopy = Object.values(drivers);
    // console.log(driversCopy);
  
    return (
      <Dialog
      classes={{
        paper: 'm-24'
      }}
      {...driverDialog.props}
      onClose={closeDialog}
      fullWidth
      maxWidth="xs"
    >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
            {driverDialog.type === 'new' ? 'New Driver' : 'Edit Driver'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            <Avatar
              className="w-96 h-96"
              alt="contact avatar"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            />
            {driverDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
          </div>
        </AppBar>
  
        <form noValidate className="flex flex-col md:overflow-hidden" onSubmit={handleSubmit(submit)}>
          <DialogContent className={classes.content}>
          <Controller
            control={control}
            name="first_name"
            render={({ field }) => (
              <TextField {...field} className="mb-24" label="First name" id="first_name" variant="outlined" fullWidth />
            )}
          />

          <Controller
            control={control}
            name="last_name"
            render={({ field }) => (
              <TextField {...field} className="mb-24" label="Last name" id="last_name" variant="outlined" fullWidth />
            )}
          />
  
            {/* <Controller
              control={control}
              name="vehicle_id"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Vehicle" id="vehicle_id" variant="outlined" fullWidth />
              )}
            /> */}
  
        <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <TextField {...field} className="mb-24" label="City" id="City" variant="outlined" fullWidth />
            )}
          />
           <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField {...field} className="mb-24" label="email address" id="email" variant="outlined" fullWidth />
            )}
          />

          <Controller
            control={control}
            name="phone_number"
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="Phone number"
                id="phone_number"
                variant="outlined"
                fullWidth
              />
            )}
          />
  
            <div className={classes.button}>
              <Button variant="contained" color="primary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Submit
              </Button>
  
              <Button variant="contained" color="secondary" onClick={closeDialog}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    );
  }
  
  export default driversDialog;