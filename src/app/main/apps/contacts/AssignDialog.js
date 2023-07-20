import {
    Dialog,
    DialogContent,
    makeStyles,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl
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
  import withReducer from 'app/store/withReducer';
  import _ from 'lodash';
  import { closeAssignDialog, closeUnassignDialog, setAssignDriver, setUnAssignDriver } from './store/contactsSlice';
  import { getDrivers, selectDrivers } from '../drivers/store/driversSlice';
  import driversReducer from '../drivers/store';
  
  //6 to do assign/unassign  drivers for veachles
  const assignValues = {
    driver_id: '',
    start_date: '',
    start_odometer: '',
    start_comment: ''
  };
  
  const schema1 = yup.object().shape({
    driver_id: yup.string().required(),
    start_date: yup.string().required(),
    start_odometer: yup.string().required(),
    start_comment: yup.string().required()
  });
  
  const unassignValues = {
    end_date: '',
    endt_odometer: '',
    end_comment: ''
  };
  
  const schema2 = yup.object().shape({
    end_date: yup.string().required(),
    end_odometer: yup.string().required(),
    end_comment: yup.string().required()
  });
  
  const useStyles = makeStyles(() => ({
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
  
  function AssignDialog() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const assignDialog = useSelector(store => store.contactsApp.contacts.assignDialog);
    const drivers = useSelector(selectDrivers);
    const defaultValue = assignDialog.type === 'assign' ? assignValues : unassignValues;
    const schema = assignDialog.type === 'assign' ? schema1 : schema2;
    const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
      mode: 'onChange',
      defaultValue,
      resolver: yupResolver(schema)
    });
  
    const { isValid, dirtyFields, errors } = formState;
  
    const initDialog = useCallback(() => {
      if (assignDialog?.type === 'assign' && assignDialog?.data) {
        reset({ ...assignDialog?.data });
      }
      if (assignDialog?.type === 'assign') {
        reset({
          ...defaultValue,
          ...assignDialog?.data
        });
      }
    }, [assignDialog?.data, assignDialog?.type, defaultValue, reset]);
  
    function closeDialog() {
      if (assignDialog?.type === 'assign') {
        dispatch(closeAssignDialog());
      }
      dispatch(closeUnassignDialog());
    }
  
    useEffect(() => {
      if (assignDialog?.props.open) {
        initDialog();
        dispatch(getDrivers());
      }
    }, [assignDialog?.props.open, initDialog]);
  
    function submit(data) {
      const assignment = {
        assign: { ...data, driver: drivers?.filter(el => el.id === data.driver_id) },
        id: assignDialog?.data.id
      };
      const unassign = {
        assign: {
          assignment_id: assignDialog?.data?.active_assignment?.id,
          assignment: data
        },
        id: assignDialog?.data.id
      };
  
      if (assignDialog?.type === 'assign') {
        dispatch(setAssignDriver(assignment));
      } else {
        dispatch(setUnAssignDriver(unassign));
      }
      closeDialog();
    }
  
    return (
      <Dialog
        classes={{
          paper: 'm-24'
        }}
        {...assignDialog.props}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {assignDialog.type === 'assign' ? 'Assign Driver' : 'Unassign Driver'}
            </Typography>
          </Toolbar>
          <div className="flex flex-col items-center justify-center pb-24">
            <Avatar
              className="w-96 h-96"
              alt="contact avatar"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            />
            {assignDialog.type === 'unassign' && (
              <Typography variant="h6" color="inherit" className="pt-8">
                {name}
              </Typography>
            )}
          </div>
        </AppBar>
  
        <form noValidate className="flex flex-col md:overflow-hidden" onSubmit={handleSubmit(submit)}>
          <DialogContent className={classes.content}>
            {assignDialog.type === 'assign' ? (
              <>
                <Controller
                  control={control}
                  name="driver_id"
                  render={({ field }) => (
                    <FormControl sx={{ m: 1, minWidth: 340 }} variant="outlined">
                      <InputLabel id="demo-simple-select-helper-label">choose driver</InputLabel>
                      <Select
                        label="choose driver"
                        id="fuel_type demo-simple-select-helper"
                        name="driver_id"
                        className="mb-24"
                        style={{ width: '340px' }}
                        {...field}
                        labelId="demo-simple-select-helper-label"
                      >
                        {drivers.map(el => (
                          <MenuItem key={el.id} value={el.id}>
                            {el.first_name} {el.last_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
  
                <Controller
                  control={control}
                  name="start_date"
                  render={({ field }) => (
                    <TextField {...field} className="mb-24" id="start_date" variant="outlined" fullWidth type="date" />
                  )}
                />
  
                <Controller
                  control={control}
                  name="start_odometer"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      id="start_odometer"
                      variant="outlined"
                      fullWidth
                      label="start odometer"
                    />
                  )}
                />
  
                <Controller
                  control={control}
                  name="start_comment"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="comment"
                      id="start_comment"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  name="end_date"
                  render={({ field }) => (
                    <TextField {...field} className="mb-24" id="end_date" variant="outlined" fullWidth type="date" />
                  )}
                />
  
                <Controller
                  control={control}
                  name="end_odometer"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      id="end_odometer"
                      variant="outlined"
                      fullWidth
                      label="end odometer"
                    />
                  )}
                />
  
                <Controller
                  control={control}
                  name="end_comment"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="comment"
                      id="end_comment"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </>
            )}
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
  
  export default withReducer('listDriversApp', driversReducer)(AssignDialog);
  